import { getDashboardStats, getRecentActivity } from '../lib/actions/dashboard';
import Link from 'next/link';
import KpiCard from '../components/dashboard/KpiCard';
import QuickAction from '../components/dashboard/QuickAction';

// RECENT_DOCUMENTS removed in favor of server data

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const recentActivity = await getRecentActivity();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <header className="flex items-end justify-between pb-8 border-b border-gray-100/50">
          <div>
            <p className="text-gold-600 font-medium text-sm tracking-wider uppercase mb-2">Bon retour, Admin</p>
            <h1 className="font-display text-5xl font-bold text-gray-900">
              Tableau de Bord
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="glass-button px-6 py-3 rounded-xl text-sm font-medium">
              Exporter le rapport
            </button>
            <button className="bg-gold-500 text-white px-6 py-3 rounded-xl text-sm font-medium shadow-lg shadow-gold-500/30 hover:bg-gold-600 transition-colors">
              + Nouveau Booking
            </button>
          </div>
        </header>

        {/* KPIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Chiffre d'Affaires"
            value={`${stats.revenue.toLocaleString('fr-FR')} €`}
            trend="+12% vs M-1"
            icon="💰"
          />
          <KpiCard
            title="Modèles Actifs"
            value={stats.activeModels.toString()}
            trend="+2 ce mois"
            icon="✨"
          />
          <KpiCard
            title="Bookings en Cours"
            value={stats.expiringContracts.toString()} // Using expiring contracts as proxy for attention needed
            trend="Action requise"
            icon="📅"
            isAlert
          />
          <KpiCard
            title="Dossiers Complets"
            value={stats.incompleteFolders.toString()}
            subtitle="Incomplets"
            trend="Dossiers à jour"
            icon="📂"
          />
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">

          {/* LEFT: Activity Feed */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold text-gray-900">Documents Récents</h2>
              <Link href="/bookings" className="text-sm text-gold-600 font-medium hover:underline">Voir tout</Link>
            </div>


            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((item) => (
                  <Link href={item.href} key={`${item.type}-${item.id}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 border border-white/50 hover:bg-white/80 transition-all group cursor-pointer block">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm ${item.type === 'invoice' ? 'bg-blue-50 text-blue-600' : 'bg-gold-50 text-gold-600'}`}>
                      {item.type === 'contract' ? '📄' : item.type === 'booking' ? '📅' : '🧾'}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-gold-700 transition-colors">{item.title}</h3>
                      <p className="text-xs text-gray-500">{item.entity} • <span className="text-gray-400">{new Date(item.date).toLocaleDateString()}</span></p>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'PAYE' || item.status === 'ACTIF' || item.status === 'VALIDE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                        }`}>
                        {item.status}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 group-hover:border-gold-300 group-hover:text-gold-600 transition-colors">
                        →
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 italic">
                  Aucune activité récente. <br /> Créez votre premier booking ou modèle !
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Quick Actions / Status */}
          <div className="glass-panel rounded-3xl p-8 bg-linear-to-b from-gold-50/50 to-white/50">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Accès Rapide</h2>
            <div className="space-y-3">
              <QuickAction href="/models/new" label="Ajouter un Mannequin" icon="👤" />
              <QuickAction href="/documents/contract" label="Générer Contrat" icon="📝" />
              <QuickAction href="/documents/invoice" label="Créer Facture" icon="h" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}