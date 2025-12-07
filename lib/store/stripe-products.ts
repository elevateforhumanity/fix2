import Stripe from "stripe";
import { gh, parseRepo } from "../github";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createProduct(title: string, price: number) {
  const product = await stripe.products.create({ name: title });

  const priceObj = await stripe.prices.create({
    product: product.id,
    unit_amount: price * 100,
    currency: "usd",
  });

  return { product, price: priceObj };
}

export async function createStoreProduct(
  title: string, 
  price: number, 
  repo: string,
  description?: string
) {
  const product = await stripe.products.create({
    name: title,
    description,
    metadata: { repo },
  });

  const priceObj = await stripe.prices.create({
    product: product.id,
    unit_amount: price * 100,
    currency: "usd",
  });

  return { product, price: priceObj };
}

export async function cloneRepository(sourceRepo: string, newRepoName: string) {
  const client = gh();
  const { owner, name } = parseRepo(sourceRepo);

  // Create new repo for customer
  const newRepo = await client.repos.createForAuthenticatedUser({
    name: newRepoName,
    private: true,
    description: `Cloned from ${sourceRepo}`,
  });

  // Try to use template cloning API
  try {
    await client.repos.createUsingTemplate({
      template_owner: owner,
      template_repo: name,
      owner: newRepo.data.owner!.login,
      name: newRepoName,
      include_all_branches: true,
    });
  } catch (error) {
    // If template method fails, the empty repo is still created
    console.warn("Template cloning failed, empty repo created:", error);
  }

  return newRepo.data.full_name;
}
