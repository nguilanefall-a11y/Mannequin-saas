import { getDashboardStats } from './lib/actions/dashboard';

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Dashboard
        </h1>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-sm font-medium text-gray-500">
            Active Models
          </h2>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            {stats.activeModels}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-sm font-medium text-gray-500">
            Incomplete Folders
          </h2>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            {stats.incompleteFolders}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-sm font-medium text-gray-500">
            Pending Payments
          </h2>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            {stats.pendingPayments.toLocaleString('fr-FR')} €
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-sm font-medium text-gray-500">
            Expiring Contracts
          </h2>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            {stats.expiringContracts}
          </p>
        </div>
      </div>
    </div>
  );
}