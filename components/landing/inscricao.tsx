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

            const res = await fetch(submitUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            if (res.ok) {
                setStatus("ok")
                setValues({ name: "", email: "", whatsapp: "", cpf: "", profissao: "", cidade: "", motivacao: "" })
            } else {
                let msg = ""
                try {
                    const json = await res.json()
                    msg = json?.error || JSON.stringify(json)
                } catch (e) {
                    try { msg = await res.text() } catch (e2) { msg = String(e2) }
                }
                setStatus(`error: ${msg}`)
            }
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
                        {status === "sending" && <span className="text-sm text-muted-foreground">Enviando...</span>}
                        {status === "ok" && <span className="text-sm text-success">Inscrição enviada — obrigado!</span>}
                        {status && status.toString().startsWith("error") && <span className="text-sm text-destructive">Erro ao enviar</span>}
                    </div>
                </form>
            </div>
        </section>
    )
}
