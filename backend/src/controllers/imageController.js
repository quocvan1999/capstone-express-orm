import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// /lay-danh-sach-hinh-anh-tim-kiem-phan-trang
export const getImagesSearchPagination = async (req, res) => {
  const { page = 1, limit = 10, search } = req.body;

  const data = await prisma.hinh_anh.findMany({
    where: {
      OR: [
        {
          ten_hinh: {
            contains: search,
          },
        },
      ],
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      ten_hinh: "desc",
    },
  });

  const totalData = await prisma.hinh_anh.count({
    where: {
      OR: [
        {
          ten_hinh: {
            contains: search,
          },
        },
      ],
    },
  });

  return res.status(200).json({
    message: "Lấy danh sách hình ảnh thành công",
    content: {
      data: data,
      page: page,
      limit,
      totalItem: totalData,
      search,
    },
    statusCode: 200,
    timestamp: new Date().toISOString(),
  });
};
