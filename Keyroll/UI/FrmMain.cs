using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Keyroll.UI
{
    public partial class FrmMain : Form
    {
        public FrmMain()
        {
            InitializeComponent();
            UctTitleBar titlebar = new UctTitleBar();
            PanelTitle.Controls.Add(titlebar);
        }

        private void BtClose_Click(object sender, EventArgs e)
        {
            //choose min or close
            Application.Exit();
        }

        protected override void OnPaintBackground(PaintEventArgs e)
        {
            base.OnPaintBackground(e);
            Pen pen = new Pen(Color.Black, 1.0f);
            e.Graphics.DrawRectangle(pen, new Rectangle(0, 0, Width - 1, Height - 1));
        }
    }
}
