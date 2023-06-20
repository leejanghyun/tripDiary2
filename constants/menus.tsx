import { MENU_ID, MenuItem } from '@/components/Menu/Menu'

import { ReactComponent as IconAds } from '../images/ico_ads.svg'
import { ReactComponent as IconAdsSolid } from '../images/ico_ads_solid.svg'
import { ReactComponent as IconReport1 } from '../images/ico_calendar.svg'
import { ReactComponent as IconReport1Solid } from '../images/ico_calendar_solid.svg'
import { ReactComponent as IconAd2 } from '../images/ico_duplicate.svg'
import { ReactComponent as IconAd2Solid } from '../images/ico_duplicate_solid.svg'
import { ReactComponent as IconReport2 } from '../images/ico_flag.svg'
import { ReactComponent as IconReport2Solid } from '../images/ico_flag_solid.svg'
import { ReactComponent as IconReport3 } from '../images/ico_store.svg'
import { ReactComponent as IconReport3Solid } from '../images/ico_store_solid.svg'

export const menus = [
  {
    IconInActive: <IconAds />,
    IconActive: <IconAdsSolid />,
    label: '',
    id: MENU_ID.CAMPAIGN_MANAGEMENT,
  },
  {
    IconInActive: <IconAd2 />,
    IconActive: <IconAd2Solid />,
    label: '',
    id: MENU_ID.MATERIAL_MANAGEMENT,
  },
  {
    IconInActive: <IconReport1 />,
    IconActive: <IconReport1Solid />,
    label: '',
    id: MENU_ID.PERIOD_STATISTIC,
  },
  {
    IconInActive: <IconReport2 />,
    IconActive: <IconReport2Solid />,
    label: '',
    id: MENU_ID.CAMPAIGN_STATISTIC,
  },
  {
    IconInActive: <IconReport3 />,
    IconActive: <IconReport3Solid />,
    label: '',
    id: MENU_ID.AD_STATISTIC,
  },
] as unknown as MenuItem[]
