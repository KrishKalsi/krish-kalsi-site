# Site content — single source of truth

Everything the site says. Use this wording exactly. Nothing visitors see may be a placeholder: where a project has no link of its own yet, it links to the GitHub profile.

## Profile

- Name: Krish Kalsi
- Monogram: KK©
- Cover line: Data science student
- Email: krishkalsi9@gmail.com
- Based: Mumbai, India — 19.07°N 72.87°E
- Menu-bar location: Mumbai, IST
- Cover corner: Portfolio ’26
- GitHub: https://github.com/KrishKalsi
- LinkedIn: https://www.linkedin.com/in/krish-kalsi-b33404248/

## Home — About panel (01)

Statement:
> Third-year data science student at NMIMS, Mumbai. I build models whose claims can be checked — prediction intervals, simulations, forecasts — and I’m most at home where statistics meets markets.

| Label | Value |
|---|---|
| Education: | B.Tech Data Science, NMIMS MPSTME / 2024–28 · CGPA 8.43 |
| Focus: | Uncertainty quantification / Quant finance · Econometrics |
| Now: | Conformal prediction lab / NHANES survey-design audit |
| Open to: | Research internships / Summer 2027 |

## Work (06)

| No. | Area | Title | Detail | Link |
|---|---|---|---|---|
| 01 | Uncertainty | Conformal prediction lab | 90% coverage met on 5 datasets | `/work/conformal-prediction` (featured: filled circle) |
| 02 | Stochastic processes | Markov model of T20 cricket | MAE ≈ 21 runs over 217 matches | GitHub profile |
| 03 | Markets · Live | ETF overlap detector | Look-through across 3,000+ securities | GitHub profile |
| 04 | Risk | Portfolio analytics | Efficient frontier · Monte Carlo VaR | GitHub profile |
| 05 | Simulation | Poker equity engine | 169 hands ranked from 500K+ showdowns | GitHub profile |
| 06 | Econometrics | Electricity demand | ≈ 5% CV error on 2,900 days | GitHub profile |

Longer background for each (for future project pages — do not put on the home page):
- **01** Split conformal prediction and Conformalized Quantile Regression written from scratch, with tests that check the finite-sample coverage guarantee by averaging over repeated calibration splits. Both methods land on the 90% target across five benchmark datasets. In progress.
- **02** Markov reward process fitted on IPL ball-by-ball data to estimate innings resources, as an alternative to Duckworth–Lewis–Stern tables. Monte Carlo over 217 matches: mean absolute error ≈ 21 runs, almost no bias. Residuals and uncertainty by wickets lost.
- **03** Reads live fund-holdings disclosures; look-through exposure across 3,000+ securities, weighted overlap score between funds, HHI-based concentration. Open source, deployed. Python, pandas, Streamlit.
- **04** Markowitz mean–variance optimisation via SLSQP; minimum-variance and maximum-Sharpe portfolios; historical, parametric and Monte Carlo VaR (Cholesky, 10,000 paths); Sharpe, Sortino, Calmar, drawdown.
- **05** Monte Carlo Texas Hold’em simulator: equity, EV and call/fold, 10,000+ run-outs per scenario; all 169 starting hands ranked from 500,000+ showdowns; treys constant-time evaluator; sub-second.
- **06** OLS on ~2,900 daily observations with weather and calendar features; AIC/BIC selection; VIF and residual diagnostics; weekday, seasonality and 2013–14 structural-break tests (t-tests, ANOVA); ≈ 5% CV error (75 MW RMSE); Ridge/Lasso/ElasticNet did not beat it.

## Research (03)

v5: formal publication list, full-width panel, **no photo**. Header right: "(03) · Working papers". Each entry: `[P#]` · citation (**Kalsi, K.** et al. “Title.”) · meta line in caps · year right-aligned · "Abstract ↓ / Abstract ↑" toggle that opens the abstract in place. P1 open by default on desktop; all closed on mobile.

**[P1]** Kalsi, K. et al. “Autonomous Stock Trading: A Comparative Review.” — 2026
- Meta: Systematic review · In final revision for submission · Supervisor: Dr Prashasti Kanikar, NMIMS MPSTME
- Abstract: A review of 19 papers from four databases, screened against criteria fixed in advance. It compares supervised price-prediction models with deep reinforcement-learning trading agents, and finds that reward functions rarely account for risk and that almost no study tests whether simulated results carry over to live trading.

**[P2]** Kalsi, K. et al. “Survey Design in Medical Machine Learning: An Audit of NHANES-Based Studies.” — 2026–27
- Meta: Supervised research · In progress · Supervisor: Dr Prashasti Kanikar, NMIMS MPSTME
- Abstract: NHANES is a complex survey with strata, clusters and sampling weights, yet much published machine-learning work treats it as a simple random sample. We measure how common this is and what it does to the reported results.

**[P3]** Kalsi, K. et al. “Critical Path Method for Quick-Commerce Logistics: Bottleneck Identification in Last-Mile Gig Delivery.” — 2025
- Meta: Working paper
- Abstract: Models a last-mile delivery run as an Activity-on-Node network (CPM/PERT) and proposes an average negative float measure that locates where delays build up.

(Mobile meta lines are shortened to the first two parts, e.g. "Systematic review · In final revision".)

## Cover

No figure, caption or Redraw button (the random walk was removed).

## Loading screen

- Top-left: KK©
- Top-right: Portfolio ’26
- Counter: 000 → 100 (three digits, zero-padded)
- Bottom-right label, three lines: "Loading:" / "One random walk, σ = 0.25" / "Step n / 140" (n counts 0 → 140)

## Experience

| Year | Organisation | Role |
|---|---|---|
| 2025 | Larsen & Toubro | Software engineering intern |
| 2025–26 | Social Conclave, MPSTME | Research & development executive |
| 2023 | Lydian Global | Research intern |

## Contact

- Title: Contact
- Label: Mail: → krishkalsi9@gmail.com (large)
- Links: GitHub ↗ · LinkedIn ↗

## Footer

© 2026 Krish Kalsi · Designed & built in Mumbai · Back to top ↑

## Project page — Conformal prediction (`/work/conformal-prediction`)

- Breadcrumb: ← Work / 01 — right: (01) Uncertainty
- Title: Conformal / prediction
- Year: 2026 · Status: In progress · Stack: Python · NumPy · scikit-learn · Button: View code ↗ (GitHub profile)
- Abstract: Conformal prediction wraps any model in intervals that contain the truth with probability at least 1 − α. I implemented split conformal and CQR from scratch, then tested the guarantee over repeated calibration splits.
- Result: **90%** — target coverage met on five benchmark datasets
- Fig. 1 — Intervals on heteroscedastic data (interactive; see CLAUDE.md). Caption: "{Method} on synthetic data where noise grows with x. Filled dots are covered; open circles fall outside. Target: {1−α}."
- Method: C(x) = [ μ̂(x) − q̂ , μ̂(x) + q̂ ] and 1 − α ≤ P( Y ∈ C(X) ) ≤ 1 − α + 1/(n+1) (render with KaTeX). Note: q̂ is the ⌈(n+1)(1−α)⌉-th smallest calibration score. CQR conformalises quantile estimates instead, so intervals widen where the noise does.
- Limitations: Coverage is marginal, not conditional. · Exchangeability fails under time series and covariate shift. · Next: weighted and adaptive conformal methods.
- Next — 02: Markov model of T20 cricket →

## About page (`/about`)

- Title: About
- Statement: I like work whose claims can be checked — against a guarantee, a baseline, or data the model hasn’t seen.
- Sub-line: Outside class I’m usually modelling something I already enjoy: cricket, poker, markets.
- Education: B.Tech, Data Science — NMIMS MPSTME, Mumbai — 2024–28 · CGPA 8.43 / ICSE Grade 10 — Avalon Heights International School — 2022 · 95.4%
- Coursework:
  - Probability & statistics: Probability and Statistics, Stochastic Processes, Statistical Methods, Statistical Inference
  - Mathematics & computing: Calculus, Linear Algebra & ODEs, Optimization, Data Structures & Algorithms, DBMS
  - This semester (filled circle): Applied Time Series, Financial Derivatives, Foundations of Machine Learning
- Skills:
  - Languages: Python, R, C++, Java, SQL, JavaScript
  - Methods: Monte Carlo simulation, econometrics, conformal prediction, portfolio optimisation, VaR
  - Tools: NumPy, pandas, scikit-learn, TensorFlow, Streamlit, Git, Tableau
- Certifications: Machine Learning Specialization — DeepLearning.AI / Quantitative Research Simulation — JPMorgan Chase / Investment Banking Simulation — JPMorgan Chase
- Beyond class: R&D Executive, Social Conclave — gig-worker welfare / Volunteer, Dynamic Welfare Group — food & sanitation drives

## Image alt text

- street.jpg: Krish on a quiet street at night, looking down at his phone
- rooftop.jpg: Krish standing by a railing against a grey night sky
- laugh.jpg: A motion-blurred photo of Krish laughing at night

## SEO

- Title: Krish Kalsi — Data science, statistics & quant finance
- Description: Personal site of Krish Kalsi, a data science student in Mumbai working on uncertainty quantification, statistical modelling and quantitative finance.
