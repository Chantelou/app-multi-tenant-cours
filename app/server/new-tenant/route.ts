import { SendMail } from "@/controllers/sendMail";
import { auth } from "@/lib/firebaseConfig";
import { MailTenant } from "@/lib/mailTenant";
import { TenantType } from "@/types";
import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    try {
        
        const serveur = process.env.db_url || null
        if(!serveur) return NextResponse.json({message: "Serveur non disponible ou url manquant."})

        const { nomTenant, email, role, nom} = await req.json()

        if(!nomTenant || nomTenant === "") return NextResponse.json({message: "Le nom de l'entreprise est manquant"});

        //On verifie si le tenant (par son nom) n'est pas déjà ajouté
        const recupTenats = await axios.get(`${serveur}/tenants.json?auth=${process.env.db_secret}`)
        const tenants = recupTenats.data as Record<string, TenantType> || null
        
        if(tenants) {
            const listeTenants = Object.entries(tenants).map(([id, data]) => ({id, ...data}))
            const verifTenantNom = listeTenants?.find(el => el?.nomTenant?.toLowerCase() === nomTenant.toLowerCase()) || null
            if(verifTenantNom) return NextResponse.json({message: "Ce nom d'entreprise existe déjà"});

            const verifTenantEmail = listeTenants?.find(el => el?.emailAdmin?.toLowerCase() === email.toLowerCase()) || null
            if(verifTenantEmail) return NextResponse.json({message: "Cette adresse mail existe déjà"});
        }

        //On ajoute le tenant dans la db
        const addTenant = await axios.post(`${serveur}/tenants.json?auth=${process.env.db_secret}`, { nomTenant, emailAdmin: email, dateCreate: new Date()})
        const tenantId = addTenant.data.name

        //On ajoute l'admin du tenant
        const password = Math.random().toString(36).slice(-8) //On créé le password de façon dynamique

        const dataAdmin = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(dataAdmin.user, { displayName: nom })
        await axios.put(`${serveur}/TenantAdmin/${dataAdmin.user.uid}.json?auth=${process.env.db_secret}`, {role, nom, tenantId })

        //On envoie l'email à l'entreprise avec les identifiants de connexion
        const message = MailTenant(nomTenant, email, password)
        const send = await SendMail(email, "Compte Tenant créé", message)

        return NextResponse.json({message: "Compte tenant créé avec succès", tenantId})

    } catch (error: any) {
        console.log(error)
        if(error.message === "Firebase: Error (auth/email-already-in-use).") return NextResponse.json({message: "Email déjà enregistré"})
        return NextResponse.json({message: "Une erreur s'est produite."})
    }
}