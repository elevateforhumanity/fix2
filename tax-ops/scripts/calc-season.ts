import fs from 'fs';
import path from 'path';

type ReturnRow = {
  return_id: string;
  sub_office_id: string;
  accepted: boolean;
  base_fee: number;
  addons_fee: number;
  software_cost: number;
  errors_flagged: number;
  compliance_flag: boolean;
  filed_at: string;
};

type SplitRules = {
  sub_office_percent_of_base: number;
  main_office_percent_of_base: number;
  split_applies_only_if_accepted: boolean;
  sub_office_gets_addons: boolean;
};

type BonusRules = {
  minimum_returns: number;
  error_rate_max_percent: number;
  requires_zero_compliance_flags: boolean;
  volume_bonuses: { min: number; max: number; amount: number }[];
  quality_bonus: { error_rate_under_percent: number; amount: number };
  zero_compliance_bonus: { amount: number };
  discretionary: boolean;
};

function readJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, 'utf8')) as T;
}

function pct(amount: number, percent: number): number {
  return Math.round(amount * percent * 100) / 100;
}

function inSeason(
  dateStr: string,
  seasonStart: string,
  seasonEnd: string
): boolean {
  return dateStr >= seasonStart && dateStr <= seasonEnd;
}

function pickVolumeBonus(count: number, rules: BonusRules): number {
  const tier = rules.volume_bonuses.find(
    (t) => count >= t.min && count <= t.max
  );
  return tier ? tier.amount : 0;
}

function main() {
  const root = process.cwd();
  const dataPath = path.join(root, 'tax-ops/data/returns.json');
  const splitPath = path.join(root, 'tax-ops/splits/compensation-rules.json');
  const bonusPath = path.join(root, 'tax-ops/bonuses/season-bonus-rules.json');

  const returns = readJson<ReturnRow[]>(dataPath);
  const splitRules = readJson<SplitRules>(splitPath);
  const bonusRules = readJson<BonusRules>(bonusPath);

  const SEASON_START = '2026-01-01';
  const SEASON_END = '2026-04-30';

  const seasonReturns = returns.filter((r) =>
    inSeason(r.filed_at, SEASON_START, SEASON_END)
  );

  const byOffice = new Map<string, ReturnRow[]>();
  for (const r of seasonReturns) {
    if (!byOffice.has(r.sub_office_id)) byOffice.set(r.sub_office_id, []);
    byOffice.get(r.sub_office_id)!.push(r);
  }

  const report: any[] = [];

  for (const [subOfficeId, rows] of byOffice.entries()) {
    const acceptedRows = rows.filter((r) => r.accepted);

    const acceptedCount = acceptedRows.length;
    const totalBase = acceptedRows.reduce((s, r) => s + r.base_fee, 0);
    const totalAddons = acceptedRows.reduce((s, r) => s + r.addons_fee, 0);
    const totalSoftware = acceptedRows.reduce((s, r) => s + r.software_cost, 0);

    const totalErrors = acceptedRows.reduce((s, r) => s + r.errors_flagged, 0);
    const returnsWithAnyError = acceptedRows.filter(
      (r) => r.errors_flagged > 0
    ).length;
    const errorRate =
      acceptedCount === 0 ? 0 : (returnsWithAnyError / acceptedCount) * 100;

    const anyComplianceFlags = acceptedRows.some((r) => r.compliance_flag);

    const subOfficePayout = pct(
      totalBase,
      splitRules.sub_office_percent_of_base / 100
    );
    const mainOfficeFromBase = pct(
      totalBase,
      splitRules.main_office_percent_of_base / 100
    );
    const mainOfficeGross = mainOfficeFromBase + totalAddons;
    const mainOfficeNetAfterSoftware = mainOfficeGross - totalSoftware;

    const meetsMin = acceptedCount >= bonusRules.minimum_returns;
    const meetsError = errorRate <= bonusRules.error_rate_max_percent;
    const meetsCompliance = bonusRules.requires_zero_compliance_flags
      ? !anyComplianceFlags
      : true;

    const eligible = meetsMin && meetsError && meetsCompliance;

    const volBonus = eligible ? pickVolumeBonus(acceptedCount, bonusRules) : 0;
    const qualBonus =
      eligible && errorRate < bonusRules.quality_bonus.error_rate_under_percent
        ? bonusRules.quality_bonus.amount
        : 0;
    const complianceBonus =
      eligible && !anyComplianceFlags
        ? bonusRules.zero_compliance_bonus.amount
        : 0;

    const recommendedBonus = volBonus + qualBonus + complianceBonus;

    report.push({
      sub_office_id: subOfficeId,
      season_start: SEASON_START,
      season_end: SEASON_END,
      accepted_returns: acceptedCount,
      total_base_fees: totalBase,
      total_addons_fees: totalAddons,
      sub_office_payout_base_only: subOfficePayout,
      main_office_gross: mainOfficeGross,
      main_office_net_after_software: mainOfficeNetAfterSoftware,
      error_rate_percent: Math.round(errorRate * 100) / 100,
      compliance_flags_present: anyComplianceFlags,
      bonus_eligible: eligible,
      recommended_bonus: recommendedBonus,
      note: bonusRules.discretionary
        ? 'Bonuses are discretionary; this is a recommendation.'
        : 'Bonus is non-discretionary.',
    });
  }

  const outPath = path.join(root, 'tax-ops/reports/season-report.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(`✅ Wrote report: ${outPath}`);
  console.log(report);
}

main();
