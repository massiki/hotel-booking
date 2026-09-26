import { IconType } from 'react-icons'

type CardDashboardProps = {
  bgColor: string,
  iconColor: string,
  value: string | number,
  label: string,
  icon: IconType
}

const CardDashboard = ({ bgColor, iconColor, value, label, icon: Icon }: CardDashboardProps) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-4">
        <div
          className={`shrink-0 w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}
        >
          <Icon className={`text-xl ${iconColor}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {value}
          </p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  )
}

export default CardDashboard