import { useCurrency } from "@/hooks/use-currency";

const CustomTooltip = ({ active, payload, label, darkMode }: any) => {
    
    const {currencySymbol} = useCurrency()
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-md shadow-md ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
          <p className="font-medium text-sm">{`${label}`}</p>
          <p className="text-sm text-blue-500">{`Ventes: ${payload[0].value}`}</p>
          <p className="text-sm text-purple-500">{`Revenus: ${payload[1].value} ${currencySymbol}`}</p>
        </div>
      );
    }
    return null;
  };

export default CustomTooltip