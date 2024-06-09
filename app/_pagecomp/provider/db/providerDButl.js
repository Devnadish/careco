'use server'
import {
  getCarIdRetunCarInfo,
  getServiceIdRetunServiceInfo
} from '@/more/db/utlDb'
import db from '@/more/lib/prisma'
import { revalidatePath } from 'next/cache'
import { CollectRatine } from './rateDb'

export const getProvidersRate = async providers => {
  const updatedProviders = await Promise.all(
    providers.map(async provider => {
      const rate = await CollectRatine(provider.id)

      return {
        ...provider,
        rate: rate
      }
    })
  )
  return updatedProviders
}

export const getProviderWithCarNames = async providers => {
  return Promise.all(
    providers.map(async provider => {
      const carNamesAndImages = await getCarNamesAndImages(provider.carType)
      const serviceNamesAndImages = await getServiceNamesAndImages(
        provider.service
      )
      const extraServiceNamesAndImages = await getExtraServiceNamesAndImages(
        provider.extarService
      )
      return {
        ...provider,
        carType: carNamesAndImages,
        department: serviceNamesAndImages,
        moreService: extraServiceNamesAndImages
      }
    })
  )
}

export const getCarNamesAndImages = async carIds => {
  const carInfoPromises = carIds.map(
    async carId => await getCarIdRetunCarInfo(carId)
  )

  const carInfos = await Promise.all(carInfoPromises)

  const carNamesAndImages = carInfos.map(({ id, name, image }) => ({
    id,
    name,
    image
  }))
  return carNamesAndImages
}

export const getServiceNamesAndImages = async serviceIds => {
  return Promise.all(
    serviceIds.map(
      async serviceId => await getServiceIdRetunServiceInfo(serviceId)
    )
  ).then(serviceInfos => {
    return serviceInfos.map(serviceInfo => ({
      id: serviceInfo.id,
      name: serviceInfo?.service,
      image: serviceInfo?.logo
    }))
  })
}

export const getExtraServiceNamesAndImages = async extraServiceIds => {
  return Promise.all(
    extraServiceIds.map(async extraServiceId => {
      const extraServiceInfo =
        await getServiceIdRetunServiceInfo(extraServiceId)
      return {
        id: extraServiceInfo.id,
        name: extraServiceInfo?.service,
        image: extraServiceInfo?.logo
      }
    })
  ).then(extraServiceInfos => {
    return extraServiceInfos
  })
}
export const carListWithIdReturnCarNames = async providers => {
  const updatedProviders = await Promise.all(
    providers.map(async provider => {
      const carNames = await Promise.all(
        provider.carType.map(async carId => {
          const carInfo = await getCarIdRetunCarInfo(carId)
          return carInfo.name // Extract only the car name
        })
      )

      return {
        ...provider,
        carType: carNames
      }
    })
  )
  return updatedProviders
}
