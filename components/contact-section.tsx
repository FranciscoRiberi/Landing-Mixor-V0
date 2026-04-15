"use client";

import React from "react"

import { useState } from "react";
import { Instagram, Twitter, Linkedin, Mail, ArrowRight, FileText, Facebook, MessageCircle } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/p/Mixor-61558422137441/", label: "Facebook" },
  { icon: Mail, href: "mailto:hello@nion.tech", label: "Email" },
];

const salesAdvisors = [
  { name: "Alejandra", phone: "+5491137994825" },
  { name: "Marcelo", phone: "+5493518698065" },
  { name: "German", phone: "+5491158979196" },
];

const provinces = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
  "Ciudad Autónoma de Buenos Aires",
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    advisor: "Alejandra",
    province: "Buenos Aires",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedAdvisor = salesAdvisors.find(a => a.name === formData.advisor);
    if (!selectedAdvisor) return;

    // Capture lead — fire and forget, WhatsApp opens regardless
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.name,
          provincia: formData.province,
          asesor: formData.advisor,
          mensaje: formData.message,
          fuente: "Formulario de Contacto",
        }),
      });
    } catch (err) {
      // Silently ignore — WhatsApp redirect must always happen
    }

    const whatsappMessage = `Hola, soy ${formData.name} de ${formData.province}. ${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${selectedAdvisor.phone}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <section id="contacto" className="py-16 lg:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Contáctanos
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6 text-balance">
            Contactate con nuestros Asesores
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-3">
            Elegí tu asesor y te conectaremos directamente por WhatsApp para responder todas tus consultas.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary">
            <MessageCircle size={16} />
            <span>Respuesta inmediata por WhatsApp</span>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div>
              <label
                htmlFor="advisor"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Asesor de Venta
              </label>
              <select
                id="advisor"
                value={formData.advisor}
                onChange={(e) =>
                  setFormData({ ...formData, advisor: e.target.value })
                }
                className="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300"
                required
              >
                {salesAdvisors.map((advisor) => (
                  <option key={advisor.name} value={advisor.name}>
                    {advisor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Provincia
            </label>
            <select
              id="province"
              value={formData.province}
              onChange={(e) =>
                setFormData({ ...formData, province: e.target.value })
              }
              className="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300"
              required
            >
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Cuéntanos cómo podemos ayudarte..."
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-base font-medium hover:bg-foreground/90 transition-all duration-300 group"
            >
              <MessageCircle size={18} />
              Conectar por WhatsApp
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>

            {/* Catalog and Distributor CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <a
                href="https://docs.google.com/spreadsheets/d/1mvKO3qGRQxwXSHSvRmVKjwTiYXqt-ASjKSmUke8QRPo/edit?gid=0#gid=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-300"
              >
                <FileText size={16} />
                Catálogo de Productos
              </a>

              <span className="hidden sm:block text-muted-foreground">•</span>

              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-300 underline underline-offset-4"
              >
                Conviértete en Distribuidor
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
