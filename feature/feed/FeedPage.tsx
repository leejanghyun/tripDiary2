import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import { useEffect, useState } from 'react'

// import { FormProvider } from 'react-hook-form'
import Map from '@/components/Map/Map'
import { MENU_ID } from '@/components/Menu'
import { getPosition, Location } from '@/utils/map'

import FrameLayout from '../../components/FrameLayout'
// import { CreateFeedFormType, getCreateDefaultValue } from './constants/form'

function FeedPage() {
  const [location, setLocation] = useState<null | Location>(null)
  // const defaultValues = getCreateDefaultValue()
  // const formMethods = useForm<CreateFeedFormType>({
  //   defaultValues,
  //   mode: 'onBlur',
  // })
  // const {
  //   getValues, setValue, control,
  // } = formMethods || {}

  const initLocation = async () => {
    const location = await getPosition()

    setLocation(location)
  }

  useEffect(() => {
    initLocation()
  }, [])

  return (
    <FrameLayout menuId={MENU_ID.ADD_FEED}>
      {/* <FormProvider {...formMethods}> */}
      <MapWrapper>
        <Map
          zoom={15}
          markers={location ? [location] : []}
        />
      </MapWrapper>
      {/* </FormProvider> */}
    </FrameLayout>
  )
}

const MapWrapper = styled.div`
  margin: 15px 0;
  width: 100%;
  height: 25vh;
  border: 1px solid ${COLOR.primary.color.tmobi.blue[200]};
  border-radius: 10px;
`

export default FeedPage
