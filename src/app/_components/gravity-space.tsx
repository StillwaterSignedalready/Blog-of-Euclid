export function GravitySpace() {
  return (
  <div className="-z-10 header-bg-space absolute h-64 sm:h-56 md:h-80 lg:h-64 left-0 right-0 top-0 overflow-hidden">
    <div id="bigPlanet" className="big-planet -z-30 bg-gray-300 rounded-full absolute animate-[pulse_5s_infinite]" />
    <div className="-z-10 avatar-planet rounded-full absolute h-24 w-24 top-12 left-20 from-gray-50 animate-[movingleftright0_75s_infinite] " />
    <div className="rounded-full bg-gray-50 absolute h-12 w-12 top-32 left-23 animate-[movingleftright1_35s_infinite] halo-planet" />
    <div className="-z-50 rounded-full bg-sky-200 absolute h-8 w-8 far-deep-planet animate-[movingupright0_30s_infinite]" />
    <div className="-z-1 rounded-full bg-gray-100 absolute h-28 w-28 far-big-planet animate-[movingleftright2_46s_infinite]" />
    <div className="side-twin-0 -z-10 rounded-full bg-gray-700 absolute h-8 w-8 animate-[movingdownright0_34s_infinite]" />
    <div className="side-twin-1 -z-10 rounded-full bg-gray-700 absolute h-8 w-8 animate-[movingupleft0_34s_infinite]" />
    <div className="bottom-horizon-planet -z-50 rounded-full bg-gray-400 absolute h-8 w-8 animate-[movingdownright1_80s_infinite]" />
    <div className="top-big-planet -z-50 rounded-full bg-gray-600 absolute animate-[movingupdown0_70s_infinite]" />
    {/* <div className="-z-1 rounded-full bg-gray-900 absolute h-28 w-28" /> */}
  </div>
  )
}
