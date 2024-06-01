import { GoBack } from '@/components/shared/GoHome'
import React from 'react'
import { GeneralInfo } from '@/app/_pagecomp/provider/edit/GeneralInfo'
import { CarFixing } from '@/app/_pagecomp/provider/edit/CarFixing'
import { Detail } from '@/app/_pagecomp/provider/edit/Detail'
import { Service } from '@/app/_pagecomp/provider/edit/Service'
import { ImageSlider } from '@/app/_pagecomp/provider/edit/ImageSlider'
import { ExtraServices } from '@/app/_pagecomp/provider/edit/ExtraServices'
import { Location } from '@/app/_pagecomp/provider/edit/Location'
import { getProviderData } from '@/app/_pagecomp/provider/edit/editdb'
import Text from '@/components/shared/Text'

async function page({ params }) {
  const getData = await getProviderData(params.providerid)
  const PD = getData.provider
  return (
    <div className='container mb-16 bg-secondary/30 p-4'>
      <GoBack />
      <Text>التعديلات ستكون علي مسئوليتك</Text>
      <div className='mb-2 flex w-full items-center justify-end gap-4 '>
        {/* confirmation */}
        <div className='m-1 flex gap-4  rounded-md bg-destructive p-2'>
          <Text>موافق</Text>
          <input
            type='checkbox'
            // id={item.id}
            // checked={selectedItems.includes(item.id)}
            // onChange={() => handleSelect(item.id)}
          />
        </div>
      </div>
      <div className='flex flex-wrap items-start gap-4 '>
        {/* <Dropzone /> */}
        <GeneralInfo
          providerName={PD.providerName}
          heroSlogon={PD.heroSlogon}
          email={PD.email}
          mobile={PD.mobile}
          type={PD.type}
          city={PD.city}
          dist={PD.dist}
          branchCount={PD.branchCount}
          createdAt={PD.createdAt}
          updatedAt={PD.updatedAt}
        />
        <Service department={getData.department} service={PD.service} />
        <ExtraServices
          extraService={getData.extraService}
          extarService={PD.extarService}
        />
        <ImageSlider coverImage={PD.coverImage} logo={PD.logo} />
        <CarFixing carList={getData.carList} carType={PD.carType} />
        <Detail description={PD.description} detail={PD.detail} />
        <Location />
      </div>
    </div>
  )
}
{
}

export default page
