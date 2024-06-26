import { ResourceNotFoundError } from "./erros/resource-not-found-error"
import { CheckInsRepository } from "../repositories/check-in-repository"
import { CheckIn } from "@prisma/client"

// Tipagem de entrada

interface FetchHistoryUseCaseProps {
	userId: string
	page: number
}

// Tipagem de saida

interface FetchHistoryUseCaseResponse {
	userCheckIns: CheckIn[]
}

export class FetchHistoryUseCase {
	private checkInsRepository: CheckInsRepository

	constructor(checkInsRepository: CheckInsRepository) {
		this.checkInsRepository = checkInsRepository
	}

	async fetchHistory({
		userId,
		page
	}: FetchHistoryUseCaseProps): Promise<FetchHistoryUseCaseResponse> {
		const userCheckIns = await this.checkInsRepository.findManyByUserId(
			userId,
			page
		)

		if (!userCheckIns) {
			throw new ResourceNotFoundError()
		}

		return { userCheckIns }
	}
}
