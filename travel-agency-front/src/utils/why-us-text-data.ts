export interface WhyUsTextData {
  titleKey: string;
  contentKeys: string[];
}

export const textBlocks: WhyUsTextData[] = [
  {
    titleKey: "whyUsText.block0.title",
    contentKeys: [
      "whyUsText.block0.content.0",
      "whyUsText.block0.content.1",
      "whyUsText.block0.content.2",
    ],
  },
  {
    titleKey: "whyUsText.block1.title",
    contentKeys: ["whyUsText.block1.content.0", "whyUsText.block1.content.1"],
  },
  {
    titleKey: "whyUsText.block2.title",
    contentKeys: ["whyUsText.block2.content.0", "whyUsText.block2.content.1"],
  },
];
