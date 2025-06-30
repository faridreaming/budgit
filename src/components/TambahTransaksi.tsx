'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Minus, Plus, CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { id } from 'date-fns/locale'
import type { Kategori } from '@/data/kategori'
import { kategori } from '@/data/kategori'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Transaksi = {
  id: number
  tanggal: Date
  jumlah: number
  keterangan: string
  kategori_id: Kategori['id']
  deskripsi: string | null
}

const formSchema = z.object({
  jumlah: z.number().min(1, 'Jumlah harus lebih dari 0'),
  keterangan: z.string().min(1, 'Keterangan harus diisi'),
  tanggal: z.date({
    required_error: 'Tanggal harus dipilih',
  }),
  jenis: z.enum(['pengeluaran', 'penghasilan']),
  kategori: z.string().min(1, 'Kategori harus dipilih'),
  deskripsi: z.string().optional(),
})

export default function TambahTransaksi({
  onAddTransaksi,
  transaksi,
}: {
  onAddTransaksi: (transaksi: Transaksi) => void
  transaksi: Transaksi[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const step = 500
  const min = 0

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jumlah: 0,
      keterangan: '',
      tanggal: new Date(),
      jenis: 'pengeluaran',
      kategori: '',
      deskripsi: '',
    },
  })

  const jenisValue = form.watch('jenis')

  const [activeKategori, setActiveKategori] = useState<Kategori[]>(
    kategori.filter((kategori) => kategori.jenis === jenisValue)
  )

  useEffect(() => {
    setActiveKategori(kategori.filter((kategori) => kategori.jenis === jenisValue))
    form.setValue('kategori', '')
  }, [jenisValue, form])

  const handleStep = (type: 'increment' | 'decrement') => {
    const currentValue = form.getValues('jumlah')
    const next = type === 'increment' ? currentValue + step : currentValue - step
    form.setValue('jumlah', Math.max(min, next))
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsOpen(false)
    form.reset()
    onAddTransaksi({
      ...values,
      id: transaksi.length + 1,
      kategori_id: Number(values.kategori),
      deskripsi: values.deskripsi ?? null,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Tambah Transaksi</Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-card sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Tambah Transaksi</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Tambahkan transaksi baru untuk mengelola keuangan Anda.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-3 py-4">
              <FormField
                control={form.control}
                name="jumlah"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
                      <FormLabel className="sm:justify-end-safe sm:text-right">Jumlah (Rp)</FormLabel>
                      <div className="col-span-3 flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleStep('decrement')}
                          tabIndex={-1}
                        >
                          <Minus />
                        </Button>
                        <FormControl>
                          <Input
                            type="text"
                            className="w-full text-center"
                            placeholder="Masukkan jumlah"
                            inputMode="numeric"
                            autoFocus
                            value={field.value ? new Intl.NumberFormat('id-ID').format(field.value) : ''}
                            onChange={(e) => {
                              const rawValue = e.target.value.replace(/[^0-9]/g, '')
                              const numericValue = rawValue ? Number(rawValue) : 0
                              field.onChange(numericValue)
                            }}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleStep('increment')}
                          tabIndex={-1}
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div></div>
                      <div className="col-span-3">
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="keterangan"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
                      <FormLabel className="sm:justify-end-safe sm:text-right">Keterangan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Masukkan keterangan" className="col-span-3" />
                      </FormControl>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div></div>
                      <div className="col-span-3">
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tanggal"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
                      <FormLabel className="sm:justify-end-safe sm:text-right">Tanggal</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'col-span-3 justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                            type="button"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, 'PPP', {
                                locale: id,
                              })
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div></div>
                      <div className="col-span-3">
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jenis"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
                      <FormLabel className="sm:justify-end-safe sm:text-right">Jenis</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="col-span-3 w-full">
                            <SelectValue placeholder="Pilih jenis" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
                          <SelectItem value="penghasilan">Penghasilan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div></div>
                      <div className="col-span-3">
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kategori"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
                      <FormLabel className="sm:justify-end-safe sm:text-right">Kategori</FormLabel>
                      <div className="col-span-3 flex items-center gap-2">
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {activeKategori.map((kategori) => (
                              <SelectItem key={kategori.id} value={kategori.id.toString()}>
                                <span className="hidden">{kategori.nama}</span>
                                {kategori.icon} {kategori.nama}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* TODO: Tambahkan kategori baru */}
                        {/* <Button variant="outline" size="icon">
                          <Plus />
                        </Button> */}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div></div>
                      <div className="col-span-3">
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deskripsi"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
                      <FormLabel className="sm:justify-end-safe sm:text-right">Deskripsi (opsional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Masukkan deskripsi" className="col-span-3" />
                      </FormControl>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div></div>
                      <div className="col-span-3">
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Simpan Transaksi</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
