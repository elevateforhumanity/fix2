.PHONY: taxops pdf calc dashboard bootstrap help

help:
	@echo "Tax Ops Makefile"
	@echo ""
	@echo "Commands:"
	@echo "  make taxops     - Run all tax ops tasks (PDF + calc + dashboard)"
	@echo "  make pdf        - Build PDF from Markdown MOU"
	@echo "  make calc       - Calculate season report"
	@echo "  make dashboard  - Open sub-office dashboard"
	@echo "  make bootstrap  - Create tax-ops directory structure"
	@echo ""

taxops: pdf calc
	@echo "✅ Tax Ops complete. View dashboard at /dashboard/sub-offices"

pdf:
	@echo "📄 Building PDF..."
	@./tax-ops/scripts/build-pdfs.sh

calc:
	@echo "🧮 Calculating season report..."
	@npx tsx tax-ops/scripts/calc-season.ts

dashboard:
	@echo "📊 Dashboard available at: http://localhost:3000/dashboard/sub-offices"
	@echo "Run: npm run dev"

bootstrap:
	@echo "🚀 Bootstrapping tax-ops structure..."
	@./tax-ops/scripts/bootstrap-tax-ops.sh
