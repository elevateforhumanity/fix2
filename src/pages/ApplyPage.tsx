import { useState, useEffect } from 'react';
import { Section, SectionHeader, Card, InputField, SelectField, TextareaField, Button } from '../components/ds';

export default function ApplyPage() {
  const [program, setProgram] = useState('Barber Apprenticeship');

  useEffect(() => {
    // Pre-select program from URL query parameter
    const params = new URLSearchParams(window.location.search);
    const programParam = params.get('program');
    if (programParam) {
      setProgram(programParam);
    }
  }, []);

  return (
    <main className="bg-white">
      <Section spacing="lg">
        <SectionHeader
          title="Apply to a program"
          subtitle="Fill this form. We'll confirm funding options (WIOA/WRG/JRI/OJT/WEX) and match you to a host site."
        />

        <Card variant="default" className="mt-8 max-w-4xl mx-auto">
          <form
            name="apply"
            method="POST"
            data-netlify="true"
            action="/apply/success"
            netlify-honeypot="bot-field"
          >
            {/* Netlify needs these hidden fields */}
            <input type="hidden" name="form-name" value="apply" />
            <p className="hidden" aria-hidden="true">
              <label>
                Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} />
              </label>
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="First name"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
              />
              
              <InputField
                label="Last name"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
              
              <InputField
                label="Phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
              />

              <InputField
                label="City"
                name="city"
                type="text"
                autoComplete="address-level2"
              />
              
              <InputField
                label="County"
                name="county"
                type="text"
              />

              <SelectField
                label="Program interest"
                name="program"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                required
              >
                <option>Barber Apprenticeship</option>
                <option>Building Tech / HVAC</option>
                <option>CNA / HHA</option>
                <option>CDL Prep</option>
                <option>Business & Tax Prep</option>
                <option>Digital Skills</option>
              </SelectField>

              <SelectField
                label="How soon can you start?"
                name="startTimeline"
                required
              >
                <option>Immediately</option>
                <option>2–4 weeks</option>
                <option>1–3 months</option>
              </SelectField>

              <TextareaField
                label="Tell us about your goal"
                name="goal"
                rows={4}
                placeholder="What job are you aiming for? Any experience or certifications?"
                className="md:col-span-2"
              />

              <fieldset className="md:col-span-2">
                <legend className="text-sm font-medium text-slate-900 mb-2">
                  Funding pre-check (select all that apply)
                </legend>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="funding[]"
                      value="WIOA/WorkOne"
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>WIOA / WorkOne</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="funding[]"
                      value="WRG"
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>WRG</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="funding[]"
                      value="JRI"
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>JRI</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="funding[]"
                      value="OJT/WEX"
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>OJT / WEX</span>
                  </label>
                </div>
              </fieldset>

              <label className="text-sm inline-flex items-start gap-2 md:col-span-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span>
                  I agree to be contacted about training, funding eligibility, and placement opportunities. 
                  I consent to the <a href="/privacy" className="text-amber-600 hover:text-amber-700 underline">privacy policy</a>.
                </span>
              </label>

              <div className="md:col-span-2">
                <Button type="submit" variant="primary" size="lg">
                  Submit application
                </Button>
              </div>
            </div>
          </form>
        </Card>

        <p className="mt-4 text-sm text-slate-500 text-center max-w-2xl mx-auto">
          We typically respond within 1–2 business days with next steps and a funding check.
        </p>
      </Section>
    </main>
  );
}
