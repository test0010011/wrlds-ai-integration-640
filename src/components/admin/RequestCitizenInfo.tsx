
import { User } from "lucide-react";

interface Citizen {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface RequestCitizenInfoProps {
  citizen: Citizen;
}

export const RequestCitizenInfo = ({ citizen }: RequestCitizenInfoProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
        <User className="h-4 w-4 mr-2" />
        Informations Citoyen
      </h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Nom:</span> {citizen.name}
        </div>
        <div>
          <span className="font-medium">Email:</span> {citizen.email}
        </div>
        <div>
          <span className="font-medium">Téléphone:</span> {citizen.phone}
        </div>
        <div>
          <span className="font-medium">Adresse:</span> {citizen.address}
        </div>
      </div>
    </div>
  );
};
