import { motion } from "framer-motion";
import { User, Camera, Upload, Shield, Briefcase, Lock } from "lucide-react";
import { FormInput, FormCheckbox, FormImageUpload } from "./FormComponents";

export const AdminStep = ({ formData, handleInputChange, handleFileChange }: any) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-4"
    >
        {/* Section 1: Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-foreground/5 pb-4">
            <div className="flex flex-col items-center">
                <FormImageUpload
                    label="Photo de profil"
                    onChange={(file: File) => handleFileChange("profilePic", file)}
                    icon={Camera}
                />
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormInput
                    label="Nom complet"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    icon={User}
                    required
                />
                <FormInput
                    label="Email professionnel"
                    name="adminEmail"
                    type="email"
                    value={formData.adminEmail}
                    onChange={handleInputChange}
                    placeholder="admin@company.com"
                    icon={Upload}
                    required
                />
                <FormInput
                    label="Mot de passe"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                />
                <FormInput
                    label="Confirmer mot de passe"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                />
            </div>
        </div>

        {/* Section 2: Professional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-b border-foreground/5 pb-4">
            <FormInput
                label="Poste / Fonction"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="ex: CEO, Directeur RH"
                icon={Briefcase}
                required
            />
            <FormInput
                label="Département"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="ex: Marketing, IT"
                icon={Shield}
                required
            />
            <FormInput
                label="Années d'expérience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="ex: 5"
            />
            <div className="md:col-span-3">
                <FormInput
                    label="Numéro de téléphone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+212 600 000 000"
                    required
                />
            </div>
        </div>

        {/* Section 3: Security & Legal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
                <FormInput
                    label="Question de sécurité"
                    name="securityQuestion"
                    value={formData.securityQuestion}
                    onChange={handleInputChange}
                    placeholder="Votre ville de naissance ?"
                    icon={Lock}
                />
                <FormCheckbox
                    label="Activer l'authentification 2FA"
                    name="twoFactorEnabled"
                    checked={formData.twoFactorEnabled}
                    onChange={(e: any) => handleInputChange({ target: { name: 'twoFactorEnabled', value: e.target.checked } })}
                />
            </div>
            <div className="space-y-2 pt-2">
                <FormCheckbox
                    label="J'accepte les conditions d'utilisation"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e: any) => handleInputChange({ target: { name: 'acceptTerms', value: e.target.checked } })}
                    required
                />
                <FormCheckbox
                    label="J'accepte la politique de confidentialité"
                    name="acceptPrivacy"
                    checked={formData.acceptPrivacy}
                    onChange={(e: any) => handleInputChange({ target: { name: 'acceptPrivacy', value: e.target.checked } })}
                    required
                />
            </div>
        </div>
    </motion.div>
);
