"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"

export function Inscricao() {
    const [values, setValues] = useState({ name: "", email: "", whatsapp: "", cpf: "", profissao: "", cidade: "", motivacao: "" })
    const [status, setStatus] = useState<string | null>(null)

    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStatus("sending")
        try {
            const submitUrl = "/api/submit"
            // Build payload including both Portuguese keys (for Apps Script) and English keys (for internal API)
            const payload: Record<string, any> = {
                // English keys
                name: values.name,
                email: values.email,
                // Portuguese keys expected by the provided doPost
                nome: values.name,
                whatsapp: values.whatsapp,
                cpf: values.cpf,
                profissao: values.profissao,
                cidade: values.cidade,
                motivacao: values.motivacao,
            }

            // Enviar via WhatsApp
            const whatsappNumber = "555199128542" // formato internacional sem + e sem espaços: 55 + DDD + número
            const message = [
                "Nova inscrição — Olhares que Transformam",
                `Nome: ${values.name}`,
                `E-mail: ${values.email}`,
                `WhatsApp: ${values.whatsapp || "(não informado)"}`,
                `CPF: ${values.cpf}`,
                `Profissão: ${values.profissao || "(não informada)"}`,
                `Cidade: ${values.cidade || "(não informada)"}`,
                `Motivação: ${values.motivacao || "(não informada)"}`,
            ].join("\n")

            const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
            window.open(url, "_blank", "noopener,noreferrer")

            setStatus("ok")
            setValues({ name: "", email: "", whatsapp: "", cpf: "", profissao: "", cidade: "", motivacao: "" })
        } catch (err) {
            setStatus("error")
        }
    }

    return (
        <section id="inscricao" className="border-t border-border bg-background">
            <div className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8">
                <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
                    Inscreva-se
                </h2>

                <form onSubmit={onSubmit} className="mx-auto mt-8 grid max-w-xl gap-3 text-left">
                    <label className="flex flex-col">
                        <span className="text-sm">Nome completo</span>
                        <input name="name" value={values.name} onChange={onChange} required className="mt-1 rounded-md border px-3 py-2" />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-sm">E-mail</span>
                        <input name="email" type="email" value={values.email} onChange={onChange} required className="mt-1 rounded-md border px-3 py-2" />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-sm">WhatsApp</span>
                        <input name="whatsapp" value={values.whatsapp} onChange={onChange} className="mt-1 rounded-md border px-3 py-2" />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-sm">CPF</span>
                        <input name="cpf" value={values.cpf} onChange={onChange} required className="mt-1 rounded-md border px-3 py-2" />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-sm">Profissão (opcional)</span>
                        <input name="profissao" value={values.profissao} onChange={onChange} className="mt-1 rounded-md border px-3 py-2" />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-sm">Cidade (opcional)</span>
                        <input name="cidade" value={values.cidade} onChange={onChange} className="mt-1 rounded-md border px-3 py-2" />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-sm">Motivação (opcional)</span>
                        <textarea name="motivacao" value={values.motivacao} onChange={onChange} rows={3} className="mt-1 rounded-md border px-3 py-2" />
                    </label>



                    <div className="mt-4 flex items-center gap-3">
                        <Button type="submit">Enviar inscrição</Button>
                        {status === "sending" && <span className="text-sm text-muted-foreground">Abrindo WhatsApp...</span>}
                        {status === "ok" && <span className="text-sm text-success">WhatsApp aberto — confira sua mensagem.</span>}
                        {status && status.toString().startsWith("error") && <span className="text-sm text-destructive">Erro ao abrir o WhatsApp</span>}
                    </div>
                </form>
            </div>
        </section>
    )
}
