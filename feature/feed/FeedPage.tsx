import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import { FormProvider, useForm } from 'react-hook-form'

import { Container } from '@/components/Container'
import FrameLayout from '@/components/FrameLayout'
import Map from '@/components/Map/Map'
import { MENU_ID } from '@/components/Menu'
import { getPosition } from '@/utils/map'

import { useMount } from '../../hooks/useMount'
import { AddressSearch } from './components/AddressSearch'
import { CreateFeedFormType, FORM_FIELD, getCreateDefaultValue } from './constants/form'

function FeedPage() {
  const defaultValues = getCreateDefaultValue()
  const formMethods = useForm<CreateFeedFormType>({
    defaultValues,
    mode: 'onBlur',
  })
  const { watch, setValue } = formMethods
  const location = watch(FORM_FIELD.LOCATION)

  const initLocation = async () => {
    const location = await getPosition()

    setValue(FORM_FIELD.LOCATION, location)
  }

  useMount(() => {
    initLocation()
  })

  return (
    <FrameLayout menuId={MENU_ID.ADD_FEED}>
      <Container
        title="피드 생성"
        descriptionTooltipMessages={['피드를 생성하시오.']}
        titleTooltipMessage="피드 생성"
      >
        <FormProvider {...formMethods}>
          <AddressSearch
            name={FORM_FIELD.SEARCH_TEXT}
          />
          <MapWrapper>
            <Map
              defaultLocation={location}
              zoom={15}
              markers={location ? [location] : []}
            />
          </MapWrapper>
        </FormProvider>
      </Container>
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
