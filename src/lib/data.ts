import { GiveawaySchema } from "@/app/api/giveaways/get/route";
import { ProductSchema } from "@/app/api/products/get/route";
import { SurveySchema } from "@/app/api/surveys/get/route";

export async function getSurvey(surveyCode: string): Promise<SurveySchema | null> {
  const apiUrl = "/api/surveys/get";
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      surveyCode
    }),
  };

  const response = await fetch(apiUrl, requestData);
  const survey: SurveySchema | null = await response.json();

  return survey
}

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