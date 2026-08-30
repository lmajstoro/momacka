import Bonus from "@/components/Bonus";
import Dinner from "@/components/Dinner";
import Footer from "@/components/Footer";
import Gift from "@/components/Gift";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Kraj from "@/components/Kraj";
import Majica from "@/components/Majica";
import Music from "@/components/Music";
import Sredina from "@/components/Sredina";
import {
  getBonus,
  getDinner,
  getFinale,
  getGift,
  getHero,
  getIntro,
  getMid,
  getMusic,
  getShirt,
} from "@/lib/media";

export default async function Home() {
  const [hero, intro, music, mid, dinner, gift, shirt, finale, bonus] =
    await Promise.all([
      getHero(),
      getIntro(),
      getMusic(),
      getMid(),
      getDinner(),
      getGift(),
      getShirt(),
      getFinale(),
      getBonus(),
    ]);

  return (
    <main>
      <Hero image={hero} />
      <Intro items={intro} />
      <Music items={music} />
      <Dinner items={dinner} />
      <Gift items={gift} />
      <Sredina items={mid} />
      <Majica items={shirt} />
      <Kraj items={finale} />
      <Bonus items={bonus} />
      <Footer />
    </main>
  );
}
