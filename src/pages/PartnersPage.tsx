import { Section, SectionHeader, Card, CardHeader, CardContent, Button } from '../components/ds';

export default function PartnersPage() {
  const agencies = [
    {
      name: 'WorkOne / EmployIndy',
      desc: 'Client referrals, funding pre-check, OJT/WEX coordination, placement reporting.',
      email: 'partners@elevateforhumanity.org',
      phone: '(317) 314-3757',
      cta: 'Refer a candidate',
      href: '/apply?program=Business%20%26%20Tax%20Prep',
    },
    {
      name: 'Indiana DWD / ETPL',
      desc: 'State alignment, program listings, outcomes, and compliance documents.',
      email: 'compliance@elevateforhumanity.org',
      phone: '(317) 314-3757',
      cta: 'Request documents',
      href: '/#contact',
    },
    {
      name: 'Host Employers',
      desc: 'Earn-while-you-learn: Barber, Building Tech/HVAC, CNA/HHA, CDL, Business & Tax.',
      email: 'employers@elevateforhumanity.org',
      phone: '(317) 314-3757',
      cta: 'Become a host site',
      href: '/apply?program=Building%20Tech%20/%20HVAC',
    },
  ];

  return (
    <main className="bg-white">
      <Section spacing="lg">
        <SectionHeader
          title="Partners"
          subtitle="We align funding (WIOA/WRG/JRI/OJT/WEX), host sites, and training outcomes."
        />

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {agencies.map((agency) => (
            <Card key={agency.name} variant="default">
              <CardHeader title={agency.name} />
              <CardContent>
                <p className="text-slate-700">{agency.desc}</p>
                <dl className="mt-4 text-sm text-slate-600 space-y-1">
                  <div>
                    <dt className="inline font-semibold">Email: </dt>
                    <dd className="inline">
                      <a
                        href={`mailto:${agency.email}`}
                        className="text-amber-600 hover:text-amber-700"
                      >
                        {agency.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold">Phone: </dt>
                    <dd className="inline">
                      <a
                        href={`tel:${agency.phone.replace(/\D/g, '')}`}
                        className="text-amber-600 hover:text-amber-700"
                      >
                        {agency.phone}
                      </a>
                    </dd>
                  </div>
                </dl>
                <a href={agency.href} className="mt-4 block">
                  <Button variant="primary" className="w-full">
                    {agency.cta}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card variant="bordered" className="mt-12">
          <CardHeader
            title="Compliance packet"
            subtitle="Capability statement, ETPL IDs, CIP codes, MOUs, outcomes, and insurance on request."
          />
          <CardContent>
            <a href="/#contact">
              <Button variant="secondary">Request packet</Button>
            </a>
          </CardContent>
        </Card>
      </Section>
    </main>
  );
}
