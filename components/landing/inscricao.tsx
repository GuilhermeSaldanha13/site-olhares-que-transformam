"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/GX8qLl9omGLKu7B1xg3cP6?s=cl&p=a&ilr=0&amv=2"

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    )
}

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

            // Enviar para API (servidor salva planilha + envia notificação WhatsApp automático)
            try {
                await fetch(submitUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                })
            } catch {
                // Ignora erro da API, segue o fluxo
            }

            // Vai direto para tela de sucesso — sem abrir janela no navegador
            setStatus("ok")
            setValues({ name: "", email: "", whatsapp: "", cpf: "", profissao: "", cidade: "", motivacao: "" })
        } catch (err) {
            setStatus("error")
        }
    }


    if (status === "ok") {
        return (
            <section id="inscricao" className="border-t border-border bg-background">
                <div className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8">
                    <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
                        Obrigada por se inscrever! 🎉
                    </h2>

                    <div className="mx-auto mt-8 max-w-xl space-y-6">
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            Para você não perder nada do evento, clique no botão abaixo e participe do grupo do WhatsApp para receber todas as informações de acesso.
                        </p>

                        <a
                            href={WHATSAPP_GROUP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#25D366] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#22c35e] hover:scale-105"
                        >
                            <WhatsAppIcon className="h-7 w-7" />
                            Entrar no grupo do WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        )
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
                        {status && status.toString().startsWith("error") && <span className="text-sm text-destructive">Erro ao enviar</span>}
                    </div>
                </form>
            </div>
        </section>
    )
}

