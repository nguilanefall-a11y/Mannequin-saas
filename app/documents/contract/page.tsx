import { getModels } from '../../lib/actions/models';
import { getClients } from '../../lib/actions/clients';
import ContractWizard from '../../components/documents/ContractWizard';

export default async function ContractPage() {
  const models = await getModels();
  const clients = await getClients();

  return (
    <ContractWizard
      models={models}
      clients={clients}
    />
  );
}