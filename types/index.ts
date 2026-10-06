export type TenantType = {
    id?: string,
    nomTenant: string
    dateCreate: Date,
    emailAdmin?: string
}

export type TenantAdminType = {
    id?: string,
    tenantId: string,
    nom: string,
    role: string,
    email: string,
    password?: string
}

export type UsersType = {
    id?: string,
    tenantId: string,
    nom: string,
    prenom?: string,
    email: string,
    password?: string
}

export type ProduitType = {
    id?: string,
    tenantId: string,
    designation: string,
    prix: string,
    idvendeur?: string
}

export type Checkout = {
    id?: string,
    idProduit: string,
    prixPayer: number | 0,
    dateCommande: Date,
    idClient: string, //idclient ici represente l'utilisateur qui a achete et non le tenant
    tenantId: string
}

