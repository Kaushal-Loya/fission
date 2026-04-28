# Prune.dev — The Dead Code Detector

**Prune.dev** is a high-precision static analysis tool designed to identify and remove unused code, orphaned modules, and dead API endpoints from modern production codebases.

Reduce your technical debt, decrease build times, and prune your repository size by an average of **23%**—with 99.8% safe-delete accuracy.

## 🚀 Key Features

- **Granular Dependency Mapping**: Traces every function export, constant, and internal API edge using deep static analysis.
- **Scroll-Driven Workflow**: A live, state-based simulation (Scan → Detect → Verify → Remove → Clean) helps you visualize exactly what will be pruned before any changes are made.
- **Safe-Removal Engine**: Every suggested deletion is cross-referenced against runtime traces, test coverage, and dynamic imports to prevent false positives.
- **Continuous Hygiene**: Native CI/CD integration for GitHub, GitLab, and Bitbucket ensures dead code never enters your main branch again.
- **Actionable Metrics**: Quantify the impact with real-time data on LOC removed, bundle size reduction, and build time savings.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (Optional) / Custom CSS Transitions
- **Deployment**: [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kaushal-Loya/fission.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

The project is structured into modular components for a clean developer experience:

- `src/components/landing/Hero`: High-impact entry point with asymmetric split layout.
- `src/components/landing/SystemPipeline`: Visualization of the core pruning process.
- `src/components/landing/HowItWorks`: Scroll-driven interactive code simulation.
- `src/components/landing/FeatureCards`: Technical deep-dives into metrics and safe-removal.
- `src/components/landing/Pricing`: Usage-based, transparent pricing tiers.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with precision for engineering teams. **Ship less, maintain more.**
