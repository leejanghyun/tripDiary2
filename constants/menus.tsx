import { MENU_ID, MenuItem, MenuType } from '@/components/Menu/Menu'

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
    label: '광고1',
    type: MenuType.TITLE,
    id: null,
    children: [
      {
        IconInActive: <IconAds />,
        IconActive: <IconAdsSolid />,
        label: '메뉴1',
        type: MenuType.MENU,
        id: MENU_ID.CAMPAIGN_MANAGEMENT,
      },
      {
        IconInActive: <IconAd2 />,
        IconActive: <IconAd2Solid />,
        label: '메뉴2',
        type: MenuType.MENU,
        id: MENU_ID.MATERIAL_MANAGEMENT,
      },
    ],
  },
  {
    label: '리포트',
    type: MenuType.TITLE,
    id: null,
    children: [
      {
        IconInActive: <IconReport1 />,
        IconActive: <IconReport1Solid />,
        label: '메뉴3',
        type: MenuType.MENU,
        id: MENU_ID.PERIOD_STATISTIC,
      },
      {
        IconInActive: <IconReport2 />,
        IconActive: <IconReport2Solid />,
        label: '메뉴4',
        type: MenuType.MENU,
        id: MENU_ID.CAMPAIGN_STATISTIC,
      },
      {
        IconInActive: <IconReport3 />,
        IconActive: <IconReport3Solid />,
        label: '메뉴5',
        type: MenuType.MENU,
        id: MENU_ID.AD_STATISTIC,
      },
    ],
  },
] as unknown as MenuItem[]
