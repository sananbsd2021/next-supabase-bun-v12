// import Hero from "@/components/hero";
// import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
// import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import ShowGalleryOutPage from "./gallerys/ShowGallery";
import ImageSlider from "@/components/ImageSlider";
import ShowNewsOutPage from "./news/ShowNews";
import ShowNewslistOutPage from "./newslists/ShowNewslists";
import MenuListPage from "@/components/leftMenulist";
import ShowEdunewsOutPage from "./edunews/ShowEdunews";
import ImageSliderFooter from "@/components/ImageSliderFooter";

export default async function Home() {
  return (
    <>
      {/* <Hero /> */}
      <div className="overflow-hidden hidden md:block">
        <ImageSliderFooter />
      </div>
      {/* <ImageSlider /> */}
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="min-h-screen flex flex-col md:flex-row required:xl">
          <div className="w-full md:w-2/6 p-4 overflow-hidden hidden md:block">
            <MenuListPage />
          </div>
          <div className="md:w-4/6 p-4">
            <ShowGalleryOutPage />
            <ShowNewsOutPage />
            <ShowNewslistOutPage />
            <ShowEdunewsOutPage />
          </div>
        </div>
        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
      </main>
        <div className="overflow-hidden hidden md:block">
          <ImageSlider />
        </div>
    </>
  );
}
