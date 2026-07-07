import { z } from "zod";

export const visualSystemSchema = z.object({
  styleName: z.string().default("商务科技风"),
  primaryColor: z.string().default("#0f766e"),
  secondaryColor: z.string().default("#f59e0b"),
  fontStyle: z.string().default("清晰现代的中文无衬线字体"),
  iconStyle: z.string().default("线性图标，少量强调色"),
  layoutStyle: z.string().default("左文右图、模块化卡片、清晰信息层级"),
  animationStyle: z.string().default("轻量入场、重点强调、平滑转场"),
  backgroundStyle: z.string().default("浅色背景，细网格或柔和几何纹理")
});

export type VisualSystemInput = z.infer<typeof visualSystemSchema>;
