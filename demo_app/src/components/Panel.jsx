import { motion } from 'framer-motion'

export default function Panel({ icon, title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-w-0 w-full rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg"
    >
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800 md:text-base">
        <span className="rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-sky-700">{icon}</span>
        {title}
      </h2>
      {children}
    </motion.section>
  )
}
