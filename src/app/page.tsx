import Hero from "@/components/site/Hero";
import Skills from "@/components/site/Skills";
import Projects from "@/components/site/Projects";
import Experience from "@/components/site/Experience";
import Contact, { Footer } from "@/components/site/Contact";
import {
  getExperiences,
  getProfile,
  getProjects,
  getSkills,
  getSocialLinks,
} from "@/lib/data";

// 前台每次请求实时读取数据库，保证后台修改后立即生效
export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, skills, projects, socials, experiences] = await Promise.all([
    getProfile(),
    getSkills(),
    getProjects(),
    getSocialLinks(),
    getExperiences(),
  ]);

  return (
    <main className="flex-1">
      <Hero profile={profile} socials={socials} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experiences={experiences} />
      <Contact profile={profile} socials={socials} />
      <Footer name={profile?.name ?? ""} />
    </main>
  );
}
