import { motion } from "framer-motion";
import { Building2, Upload } from "lucide-react";
import { FormInput, FormImageUpload } from "./FormComponents";

export const CompanyGeneralStep = ({ formData, handleInputChange, handleFileChange }: any) => (
    <motion.div
        key="step2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-4"
    >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-foreground/5 pb-4">
            <div className="flex flex-col items-center justify-center">
                <FormImageUpload
                    label="Logo de l'entreprise"
                    onChange={(file: File) => handleFileChange("logo", file)}
                    icon={Upload}
                    shape="square"
                />
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormInput
                    label="Nom de l'entreprise"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enterprise Ltd."
                    icon={Building2}
                    required
                />
                <FormInput
                    label="Identifiant fiscal"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    placeholder="IF-000000"
                    required
                />
                <FormInput
                    label="Numéro ICE / RC"
                    name="ice_rc"
                    value={formData.ice_rc}
                    onChange={handleInputChange}
                    placeholder="ICE000111222"
                    required
                />
                <FormInput
                    label="Date de création"
                    name="creationDate"
                    type="date"
                    value={formData.creationDate}
                    onChange={handleInputChange}
                    required
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
            <div className="md:col-span-2">
                <FormInput
                    label="Adresse complète"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Avenue Hassan II, Casablanca"
                    required
                />
            </div>
            <FormInput
                label="Ville"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Casablanca"
                required
            />
            <FormInput
                label="Code postal"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="20000"
                required
            />
            <FormInput
                label="Pays"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Maroc"
                required
            />
        </div>
    </motion.div>
);
