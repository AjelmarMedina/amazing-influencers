import { GiveawaySchema } from "@/app/api/giveaways/get/route";
import { ProductSchema } from "@/app/api/products/get/route";

export function getAllProducts([userEmail, key]: string[]): Promise<ProductSchema[]> {
  // prepare request
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail
    }),
  };

  // Get order from database
  return fetch("/api/products/get/all", requestData)
    .then(res => res.json())
    .then((json: ProductSchema[]) => json)

}

export function getAllGiveaways([userEmail, key]: string[]): Promise<GiveawaySchema[]> {
  // prepare request
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail
    }),
  };

  // Get order from database
  return fetch("/api/giveaways/get/all", requestData)
    .then(res => res.json())
    .then((json: GiveawaySchema[]) => json)

}

export function createSurvey(name: string, userId: string, productId: string, giveawayIds: string[]): Promise<boolean> {
  // prepare request
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name, userId, productId, giveawayIds
    }),
  };

  // Get order from database
  return fetch("/api/surveys/create", requestData)
    .then(res => res.ok)
}