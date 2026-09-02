export function toCartProductDto<
  T extends {
    variants: Array<{
      id: string
      media: unknown[]
    }>
  },
>(product: T, variantId: string) {
  const { variants, ...data } = product
  const variant = variants.find(variant => variant.id === variantId)

  if (!variant) {
    return undefined
  }

  const { media, ...variantData } = variant

  return {
    ...data,
    variant: {
      ...variantData,
      media: media[0] ?? null,
    },
  }
}
