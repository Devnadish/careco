import MechancalMan from '@/components/svg/MechancalMan'
import WorkShopCenterSvg from '@/components/svg/WorkShopCenterSvg'
import WorkshopSVG from '@/components/svg/WorkshopSVG'

export function providerType(type) {
  const typeMappings = {
    c: 'مركز',
    w: 'ورشة',
    h: 'فرد'
  }
  return typeMappings[type] || ''
}

export function providerTypeIcon(type) {
  const svgProps = {
    width: '20px',
    height: '20px'
    // className: 'text-green-500'
  }

  const typeMappings = {
    c: <WorkShopCenterSvg {...svgProps} />,
    w: <WorkshopSVG {...svgProps} />,
    h: <MechancalMan {...svgProps} />
  }
  return typeMappings[type] || ''
}
