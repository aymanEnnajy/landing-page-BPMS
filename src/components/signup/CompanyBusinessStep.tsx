import { motion } from "framer-motion";
import { CheckCircle2, Globe, Mail, Phone, Settings, Layers, DollarSign } from "lucide-react";
import { FormInput, FormSelect } from "./FormComponents";

export const CompanyBusinessStep = ({ formData, handleInputChange }: any) => (
    <motion.div
        key="step3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-4"
    >
        {/* Section 1: Business Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-b border-foreground/5 pb-4">
            <FormInput
                label="Secteur d'activité"
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                placeholder="Tech, Finance..."
                icon={Globe}
                required
            />
            <FormSelect
                label="Taille (Employés)"
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleInputChange}
                options={[
                    { label: "1-10", value: "1-10" },
                    { label: "11-50", value: "11-50" },
                    { label: "51-200", value: "51-200" },
                    { label: "200+", value: "200+" },
                ]}
            />
            <FormSelect
                label="Type d'entreprise"
                name="companyType"
                value={formData.companyType}
                onChange={handleInputChange}
                options={[
                    { label: "Startup", value: "Startup" },
                    { label: "PME", value: "PME" },
                    { label: "Grande Entreprise", value: "Grande" },
                ]}
            />
            <FormInput
                label="Site web"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="www.company.com"
                icon={Globe}
            />
            <FormInput
                label="Email entreprise"
                name="companyEmail"
                type="email"
                value={formData.companyEmail}
                onChange={handleInputChange}
                placeholder="contact@company.com"
                icon={Mail}
                required
            />
            <FormInput
                label="Téléphone entreprise"
                name="companyPhone"
                value={formData.companyPhone}
                onChange={handleInputChange}
                placeholder="+212 500 000 000"
                icon={Phone}
                required
            />
        </div>

        {/* Section 2: Internal Organization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-b border-foreground/5 pb-4">
            <FormInput
                label="Nb Départements"
                name="deptCount"
                type="number"
                value={formData.deptCount}
                onChange={handleInputChange}
                placeholder="ex: 4"
                icon={Layers}
                required
            />
            <FormInput
                label="Structure Org."
                name="orgStructure"
                value={formData.orgStructure}
                onChange={handleInputChange}
                placeholder="ex: Matricielle"
                icon={Settings}
            />
            <FormSelect
                label="Devise"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                icon={DollarSign}
                options={[
                    { label: "MAD (Dirham)", value: "MAD" },
                    { label: "EUR (Euro)", value: "EUR" },
                    { label: "USD (Dollar)", value: "USD" },
                ]}
            />
        </div>

        <div className="flex gap-4 items-center bg-primary/5 border border-primary/10 rounded-xl p-3 px-4">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-[9px] text-muted-foreground leading-tight uppercase tracking-wider font-bold">
                Validation finale : l'accès sera vérifié sous 24h après soumission.
            </p>
        </div>
    </motion.div>
);
