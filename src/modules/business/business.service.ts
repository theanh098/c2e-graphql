import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RandomBusinessesInput } from 'inputs';
import { PrismaService } from 'modules/prisma/prisma.service';
import { RandomBusinesses } from 'queries/business.query';
import { WhereBuilder } from 'utils/querybuilder';

@Injectable()
export class BusinessService {
  constructor(
    private prisma: PrismaService,
    @Inject('WHERE_BUILDER') private whereBuilder: WhereBuilder
  ) {}

  async findRandom({
    limit,
    type,
    hasBannerOnly
  }: RandomBusinessesInput): Promise<RandomBusinesses> {
    this.whereBuilder.where(`"b"."status" = 'approved'`);

    if (type) this.whereBuilder.andWhere(`'${type}' = ANY("b"."type")`);

    if (hasBannerOnly)
      this.whereBuilder.andWhere(`(
            SELECT COUNT("m"."id") FROM "medias" "m"
            WHERE "m"."business_id" = "b"."id"
            AND "m"."source" = 'Photo'
          ) > 0`);

    const dataRaw = await this.prisma.$queryRawUnsafe<Array<{ id: number }>>(`
          SELECT
            "b"."id"
          FROM "businesses" "b"
          ${this.whereBuilder.getQuery()}
          ORDER BY random()
          LIMIT ${limit}
        `);

    const data = await this.prisma.business.findMany({
      where: {
        id: {
          in: dataRaw.map(raw => raw.id)
        }
      },
      include: {
        medias: {
          where: {
            source: 'Photo'
          },
          take: 3
        }
      }
    });

    if (type) {
      const [totalProject, totalReview] = await this.count(type);

      return {
        data,
        limit,
        totalProject,
        totalReview
      };
    }
    return {
      data,
      limit
    };
  }

  async resolveIsFollowing(businessId: number, useId?: number) {
    if (!useId) return false;

    try {
      await this.prisma.followersOnBusinesses.findUniqueOrThrow({
        where: {
          followerId_businessId: {
            businessId: businessId,
            followerId: useId
          }
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  private async count(type?: string) {
    const filter: Prisma.BusinessWhereInput = {
      status: 'approved'
    };
    if (type)
      filter.type = {
        has: type
      };

    return await Promise.all([
      this.prisma.business.count({
        where: filter
      }),
      this.prisma.review.count({
        where: {
          business: filter
        }
      })
    ]);
  }
}
