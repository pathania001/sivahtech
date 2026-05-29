import { getLegacyPage } from "@/lib/legacy-page";

export async function LegacyRenderer({ slug }: { slug?: string }) {
  const page = await getLegacyPage(slug);
  const schemaPattern = new RegExp('<script type="application/ld\\\\+json">(.*?)</script>', "gis");
  const schemaScripts = [...page.headHtml.matchAll(schemaPattern)].map((match) => match[1]);

  return (
    <>
      {schemaScripts.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      ))}
      <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
    </>
  );
}
