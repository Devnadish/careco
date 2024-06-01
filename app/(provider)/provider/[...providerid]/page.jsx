import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { options } from 'more/provider/authentication/options'
import ScrollToTop from '@/components/shared/ScrollToTop'
import Text from '@/components/shared/Text'
import ImageSlider from '@/app/_pagecomp/provider/gallary/ImageSlider'
import { ExtraServices } from '@/app/_pagecomp/provider/sections/ExtraServices'
import { Testmoinal } from '@/app/_pagecomp/provider/sections/Testmoinal'
import Fotter from '@/app/_pagecomp/provider/sections/Fotter'
import { CarFixing } from '@/app/_pagecomp/provider/sections/CarFixing'
import { Detail } from '@/app/_pagecomp/provider/sections/Detail'
import UserActions from '@/app/_pagecomp/user/useractions/UserActions'
import { providerData } from '@/app/_pagecomp/provider/db/singleProvider'
import { RateSection } from '@/app/_pagecomp/provider/sections/RateSection'
import { HeroSection } from '@/app/_pagecomp/provider/sections/HeroSection'
import { Department } from '@/app/_pagecomp/provider/sections/Department'

export const dynamic = 'force-dynamic'

async function page({ params }) {
  const providerId = params.providerid[0]
  const session = await getServerSession(options)
  const providerDetail = await providerData(providerId, session?.user?.id)

  const { providerInfo, cars, department, service, rate, Imeges, userActions } =
    providerDetail

  const thisProvider =
    session?.user?.role === 'provider' &&
    session.user.email === providerInfo.email

  return (
    <div className='container flex flex-col items-center justify-center'>
      <div className='flex w-full items-center justify-end'>
        {thisProvider && <ProviderMenu providerid={providerInfo.id} />}
      </div>

      <RateSection
        session={session}
        providerId={providerInfo.id}
        rateing={rate}
      />
      {/* <TestingUI /> */}
      <HeroSection
        heroSlogon={providerInfo.heroSlogon}
        logo={providerInfo.logo}
        providerName={providerInfo.providerName}
        type={providerInfo.type}
        city={providerInfo.city}
        dist={providerInfo.dist}
        branchCount={providerInfo.branchCount}
        providerid={providerInfo.providerid}
        session={session}
        providerEmail={providerInfo.email}
      />
      <CarFixing providerCarTypes={cars} />
      <Detail
        detail={providerInfo.detail}
        description={providerInfo.description}
      />
      <Department
        department={department}
        providerId={providerId}
        providerSlug={providerInfo.slug}
      />
      <ImageSlider images={Imeges} />
      <ExtraServices
        service={service}
        providerId={providerId}
        providerSlug={providerInfo.slug}
      />
      <Testmoinal />
      <Fotter workingHours={providerInfo.workingHours} />
      {/* <ScrollToTop /> */}
      <UserActions
        providerName={providerInfo.providerName}
        session={session}
        providerId={providerInfo.id}
        providerEmail={providerInfo.email}
        userActions={userActions}
        likeCount={providerInfo.likeCount}
        disLikeCount={providerInfo.disLikeCount}
        viewerCount={providerInfo.viewerCount}
        commentCount={providerInfo.commentCount}
        shareCount={providerInfo.shareCount}
        favCount={providerInfo.favCount}
      />
    </div>
  )
}

export default page

// TODO: Rechack router Cache  when you come again to same prvider it come from the cash so the viewer counter not update

// TODO: chack lastONe return undefiend
// TOTO: Move It TO USER MENU SHOW IF PROVIDER
const ProviderMenu = ({ providerid }) => {
  return (
    <div className='flex items-center gap-4'>
      <Link
        href={`/edit/${providerid}`}
        className={
          'flex h-10  items-center justify-between self-end rounded-md bg-purple-500 px-6 py-2 '
        }
      >
        <Text>اضافة عروض</Text>
      </Link>
      <Link
        href={`/edit/${providerid}`}
        className={
          'flex h-10  items-center justify-between self-end rounded-md bg-purple-500 px-6 py-2 '
        }
      >
        <Text>اضافة مجاني</Text>
      </Link>

      <Link
        href={`/edit/${providerid}`}
        className={
          'flex h-10  items-center justify-between self-end rounded-md bg-purple-500 px-6 py-2 '
        }
      >
        <Text>مراجعة ومناقش التقيمات</Text>
      </Link>
      <Link
        href={`/edit/${providerid}`}
        className={
          'flex h-10  items-center justify-between self-end rounded-md bg-green-600 px-6 py-2 text-foreground '
        }
      >
        <Text>مراجعة ومناقش التعليقات</Text>
      </Link>
      <Link
        href={`/edit/${providerid}`}
        className={
          'flex h-10   items-center justify-between self-end rounded-md bg-destructive px-6 py-2 '
        }
      >
        <Text>تعديل الصفحة</Text>
      </Link>
    </div>
  )
}
