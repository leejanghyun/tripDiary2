import { MENU_ID, MenuItem } from '@/components/Menu/Menu'

import { ReactComponent as IconAlarm } from '../images/ico_alarm.svg'
import { ReactComponent as IconAlarmSolid } from '../images/ico_alarm_solid.svg'
import { ReactComponent as IconAddFeed } from '../images/ico_calendar.svg'
import { ReactComponent as IconAddFeedSolid } from '../images/ico_calendar_solid.svg'
import { ReactComponent as IconMap } from '../images/ico_flag.svg'
import { ReactComponent as IconMapSolid } from '../images/ico_flag_solid.svg'
import { ReactComponent as IconFeedList } from '../images/ico_store.svg'
import { ReactComponent as IconFeedListSolid } from '../images/ico_store_solid.svg'
import { ReactComponent as IconStory } from '../images/ico_storybook.svg'
import { ReactComponent as IconStorySolid } from '../images/ico_storybook_solid.svg'

export const menus = [
  {
    IconInActive: <IconMap />,
    IconActive: <IconMapSolid />,
    id: MENU_ID.MAIN,
  },
  {
    IconInActive: <IconAddFeed />,
    IconActive: <IconAddFeedSolid />,
    id: MENU_ID.ADD_FEED,
  },
  {
    IconInActive: <IconFeedList />,
    IconActive: <IconFeedListSolid />,
    id: MENU_ID.FEED_LIST,
  },
  {
    IconInActive: <IconStory />,
    IconActive: <IconStorySolid />,
    id: MENU_ID.MY_STORIES,
  },
  {
    IconInActive: <IconAlarm />,
    IconActive: <IconAlarmSolid />,
    id: MENU_ID.MY,
  },
] as unknown as MenuItem[]
