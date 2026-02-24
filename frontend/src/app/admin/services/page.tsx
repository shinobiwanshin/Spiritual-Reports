import Link from "next/link";
import { db } from "@/db";
import { services } from "@/db/schema";
import { desc } from "drizzle-orm";
import { PlusCircle, Pencil, Layers, Star } from "lucide-react";
import { DeleteServiceButton } from "../delete-service-button";
import { getIcon } from "@/lib/icon-map";

export default async function AdminServicesPage() {
  const allServices = await db
    .select()
    .from(services)
    .orderBy(desc(services.createdAt));

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-sm text-white/50 mt-1">
            {allServices.length} service{allServices.length !== 1 ? "s" : ""}{" "}
            total
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#cfa375] to-[#e8c99b] text-[#0f0a2e] text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <PlusCircle className="w-4 h-4" />
          New Service
        </Link>
      </div>

      {/* Services List */}
      {allServices.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <Layers className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50 text-sm">No services yet.</p>
          <Link
            href="/admin/services/new"
            className="text-[#cfa375] text-sm mt-2 inline-block hover:underline"
          >
            Create your first service →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {allServices.map((service) => {
            const Icon = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${service.accent}15`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.accent }} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {service.title}
                    </h3>
                    {service.featured && (
                      <Star className="w-3.5 h-3.5 text-[#cfa375] fill-[#cfa375]" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-white/60">
                      {service.subtitle}
                    </span>
                    <span className="text-xs text-white/40">
                      {service.duration}
                    </span>
                    <span className="text-xs font-semibold text-[#cfa375]">
                      ₹{service.price}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/services/${service.id}/edit`}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <DeleteServiceButton
                    serviceId={service.id}
                    serviceTitle={service.title}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
