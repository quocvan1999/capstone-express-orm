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

// /lay-thong-tin-hinh-anh/:id
export const getImageInfoById = async (req, res) => {
  const { id } = req.params;

  console.log("CHECK ID", id);

  const checkImage = await prisma.hinh_anh.findUnique({
    where: {
      hinh_id: Number(id),
    },
    select: {
      hinh_id: true,
      ten_hinh: true,
      duong_dan: true,
      mo_ta: true,
      nguoi_dung: {
        select: {
          nguoi_dung_id: true,
          email: true,
          ho_ten: true,
          tuoi: true,
          anh_dai_dien: true,
        },
      },
    },
  });

  if (!checkImage) {
    return res.status(404).json({
      message: "Hình ảnh không tồn tại",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(200).json({
    message: "Lấy thông tin hình ảnh thành công",
    content: {
      data: checkImage,
    },
    statusCode: 200,
    timestamp: new Date().toISOString(),
  });
};
