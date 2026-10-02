import { renderAppIcon } from "@/lib/appIcon";

const SIZES = ["192", "512"];

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return SIZES.map((size) => ({ size }));
}

export async function GET(_request: Request, ctx: RouteContext<"/pwa-icon/[size]">) {
  const { size } = await ctx.params;
  return renderAppIcon(Number(size));
}
