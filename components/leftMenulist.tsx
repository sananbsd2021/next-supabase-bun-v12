import Link from "next/link";
import { AiFillCaretRight } from "react-icons/ai";
import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import HeaderAuth from "@/components/header-auth";

interface MenuItemProps {
  title: string;
  href: string;
  // imgSrc: string;
  imgAlt: string;
}

interface MenuItemProps2 {
  title: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
}

interface MenuItemProps3 {
  title: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
}

const menuItems: MenuItemProps[] = [
  {
    title: "หน้าหลัก",
    href: "/",
    // imgSrc: "/images/0.gif",
    imgAlt: "Home",
  },
  {
    title: "ข้อมูลพื้นฐานโรงเรียน",
    href: "/info",
    // imgSrc: "/images/0.gif",
    imgAlt: "School Information",
  },
  {
    title: "ประวัติหน่วยงาน",
    href: "/history",
    // imgSrc: "/images/0.gif",
    imgAlt: "Organization History",
  },
  {
    title: "วิสัยทัศน์ / ปรัชญา",
    href: "/vision",
    // imgSrc: "/images/0.gif",
    imgAlt: "Vision and Philosophy",
  },
  {
    title: "คณะกรรมการสถานศึกษา",
    href: "/kk_sch",
    // imgSrc: "/images/0.gif",
    imgAlt: "School Board",
  },
  // {
  //   title: "e-service",
  //   href: "/eservice",
  //   // imgSrc: "/images/0.gif",
  //   imgAlt: "e-Service",
  // },
  // {
  //   title: "ผู้ดูแลระบบ",
  //   href: "/sign-in",
  //   // imgSrc: "/images/0.gif",
  //   imgAlt: "Admin Dashboard",
  // },
];

const menuItems2: MenuItemProps2[] = [
  {
    title: "ข้อมูลนักเรียน",
    href: "/students",
    imgSrc: "/images/0.gif",
    imgAlt: "Student information",
  },
  {
    title: "ข้อมูลบุคลากร",
    href: "/staff",
    imgSrc: "/images/0.gif",
    imgAlt: "Staff information",
  },
  {
    title: "ข้อมูลที่ดิน สิ่งปลูกสร้าง",
    href: "/properties",
    imgSrc: "/images/0.gif",
    imgAlt: "Properties information",
  },
  {
    title: "ข้อมูลครุภัณฑ์",
    href: "/assets",
    imgSrc: "/images/0.gif",
    imgAlt: "Assets information",
  },
];

const menuItems3: MenuItemProps3[] = [
  {
    title: "คณิตศาสตร์",
    href: "/math",
    imgSrc: "/images/0.gif",
    imgAlt: "Math",
  },
  {
    title: "วิทยาศาสตร์และเทคโนโลยี",
    href: "/science",
    imgSrc: "/images/0.gif",
    imgAlt: "Science and Technology",
  },
  {
    title: "ภาษาไทย",
    href: "/thai",
    imgSrc: "/images/0.gif",
    imgAlt: "Thai Language",
  },
  {
    title: "สังคมศึกษา",
    href: "/social-studies",
    imgSrc: "/images/0.gif",
    imgAlt: "Social Studies",
  },
  {
    title: "สุขศึกษา",
    href: "/health-education",
    imgSrc: "/images/0.gif",
    imgAlt: "Health Education",
  },
  {
    title: "ภาษาต่างประเทศ",
    href: "/foreign-languages",
    imgSrc: "/images/0.gif",
    imgAlt: "Foreign Languages",
  },
];

const MenuItem = ({ title, href }: MenuItemProps) => (
  <div className="flex items-center py-2">
    <div>
      <AiFillCaretRight className="text-blue-500" />
    </div>
    <div>
      <Link href={href} className="mx-2 p-1 text-blue-500 hover:underline">
        {title}
      </Link>
    </div>
  </div>
);

export default function MenuListPage() {
  return (
    <div className="w-full">
      <div className="divide-y divide-gray-400">
        <div className="bg-blue-600 p-2 rounded-sm">
          <h1 className="font-bold text-white">ข้อมูลพื้นฐาน</h1>
        </div>
        <div className="grid grid-cols-1 divide-y gap-2 pt-2">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              href={item.href}
              // imgSrc={item.imgSrc}
              imgAlt={item.imgAlt}
            />
          ))}
        </div>

        <div className="bg-blue-600 p-2 rounded-sm">
          <h1 className="font-bold text-white">ข้อมูลสารสนเทศ</h1>
        </div>
        <div className="grid grid-cols-1 divide-y gap-2 pt-2">
          {menuItems2.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              href={item.href}
              // imgSrc={item.imgSrc}
              imgAlt={item.imgAlt}
            />
          ))}
        </div>

        <div className="bg-blue-600 p-2 rounded-sm">
          <a href="#" className="font-bold text-white">
            เว็บไซต์กลุ่มสาระการเรียนรู้
          </a>
        </div>
        <div className="grid grid-cols-1 divide-y gap-2 pt-2">
          {menuItems3.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              href={item.href}
              // imgSrc={item.imgSrc}
              imgAlt={item.imgAlt}
            />
          ))}

          <div className="bg-blue-600 p-2 rounded-sm">
            <a href="#" className="font-bold text-white">
              ผู้ดูแลระบบ
            </a>
          </div>
          <div>{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}</div>
        </div>
      </div>
    </div>
  );
}
