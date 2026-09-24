import { z } from 'zod'

/** Opaque entity identifier. Always a string, regardless of backend storage. */
export const IdSchema = z.string().min(1)
export type Id = z.infer<typeof IdSchema>

/** ISO 8601 date-time with offset, e.g. `2026-09-24T18:00:00+02:00`. */
export const IsoDateTimeSchema = z.iso.datetime({ offset: true })
export type IsoDateTime = z.infer<typeof IsoDateTimeSchema>

/** Money in minor units (haléře) to avoid floating-point rounding. */
export const MoneySchema = z.object({
  amountMinor: z.number().int(),
  currency: z.literal('CZK'),
})
export type Money = z.infer<typeof MoneySchema>
