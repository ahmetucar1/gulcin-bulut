import type { Metadata } from "next";

import HomePage, { metadata as homeMetadata, revalidate } from "../page";

export { revalidate };

export const metadata: Metadata = {
  ...homeMetadata,
  alternates: {
    canonical: "/aydin-psikolog"
  }
};

export default HomePage;
