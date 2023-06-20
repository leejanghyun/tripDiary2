import { MENU_ID, MenuItem } from '@/components/Menu/Menu'

import { ReactComponent as IconAlarm } from '../images/ico_alarm.svg'
import { ReactComponent as IconAlarmSolid } from '../images/ico_alarm_solid.svg'
import { ReactComponent as IconReport1 } from '../images/ico_calendar.svg'
import { ReactComponent as IconReport1Solid } from '../images/ico_calendar_solid.svg'
import { ReactComponent as IconReport3 } from '../images/ico_store.svg'
import { ReactComponent as IconReport3Solid } from '../images/ico_store_solid.svg'

export const menus = [
  {
    IconInActive: <IconReport1 />,
    IconActive: <IconReport1Solid />,
    id: MENU_ID.MAIN,
  },
  {
    IconInActive: <IconReport1 />,
    IconActive: <IconReport1Solid />,
    id: MENU_ID.PERIOD_STATISTIC,
  },
  {
    IconInActive: <IconReport3 />,
    IconActive: <IconReport3Solid />,
    id: MENU_ID.AD_STATISTIC,
  },
  {
    IconInActive: <IconAlarm />,
    IconActive: <IconAlarmSolid />,
    id: MENU_ID.CAMPAIGN_MANAGEMENT,
  },
] as unknown as MenuItem[]
