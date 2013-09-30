namespace Keyroll.UI
{
    partial class FrmMain
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmMain));
            this.PanelUser = new System.Windows.Forms.Panel();
            this.toolbar = new System.Windows.Forms.ToolStrip();
            this.BtAdd = new System.Windows.Forms.ToolStripDropDownButton();
            this.BtAddDomain = new System.Windows.Forms.ToolStripMenuItem();
            this.BtAddRecord = new System.Windows.Forms.ToolStripMenuItem();
            this.BtRemove = new System.Windows.Forms.ToolStripButton();
            this.split1 = new System.Windows.Forms.ToolStripSeparator();
            this.BtSearch = new System.Windows.Forms.ToolStripButton();
            this.tree = new System.Windows.Forms.TreeView();
            this.PanelTitle = new System.Windows.Forms.Panel();
            this.BtShare = new System.Windows.Forms.ToolStripSplitButton();
            this.BtShareLink = new System.Windows.Forms.ToolStripMenuItem();
            this.toolbar.SuspendLayout();
            this.SuspendLayout();
            // 
            // PanelUser
            // 
            this.PanelUser.BackColor = System.Drawing.Color.Transparent;
            this.PanelUser.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.PanelUser.Location = new System.Drawing.Point(5, 515);
            this.PanelUser.Name = "PanelUser";
            this.PanelUser.Size = new System.Drawing.Size(390, 80);
            this.PanelUser.TabIndex = 5;
            // 
            // toolbar
            // 
            this.toolbar.BackColor = System.Drawing.Color.Transparent;
            this.toolbar.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;
            this.toolbar.ImageScalingSize = new System.Drawing.Size(24, 24);
            this.toolbar.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.BtAdd,
            this.BtRemove,
            this.split1,
            this.BtSearch,
            this.BtShare});
            this.toolbar.Location = new System.Drawing.Point(5, 29);
            this.toolbar.Name = "toolbar";
            this.toolbar.Size = new System.Drawing.Size(390, 31);
            this.toolbar.TabIndex = 11;
            // 
            // BtAdd
            // 
            this.BtAdd.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.BtAddDomain,
            this.BtAddRecord});
            this.BtAdd.Image = ((System.Drawing.Image)(resources.GetObject("BtAdd.Image")));
            this.BtAdd.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtAdd.Name = "BtAdd";
            this.BtAdd.Size = new System.Drawing.Size(68, 28);
            this.BtAdd.Text = "新增";
            // 
            // BtAddDomain
            // 
            this.BtAddDomain.Name = "BtAddDomain";
            this.BtAddDomain.Size = new System.Drawing.Size(152, 22);
            this.BtAddDomain.Text = "域";
            // 
            // BtAddRecord
            // 
            this.BtAddRecord.Name = "BtAddRecord";
            this.BtAddRecord.Size = new System.Drawing.Size(152, 22);
            this.BtAddRecord.Text = "记录";
            // 
            // BtRemove
            // 
            this.BtRemove.Image = ((System.Drawing.Image)(resources.GetObject("BtRemove.Image")));
            this.BtRemove.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtRemove.Name = "BtRemove";
            this.BtRemove.Size = new System.Drawing.Size(59, 28);
            this.BtRemove.Text = "移除";
            // 
            // split1
            // 
            this.split1.Name = "split1";
            this.split1.Size = new System.Drawing.Size(6, 31);
            // 
            // BtSearch
            // 
            this.BtSearch.Image = ((System.Drawing.Image)(resources.GetObject("BtSearch.Image")));
            this.BtSearch.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtSearch.Name = "BtSearch";
            this.BtSearch.Size = new System.Drawing.Size(59, 28);
            this.BtSearch.Text = "搜索";
            // 
            // tree
            // 
            this.tree.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tree.Location = new System.Drawing.Point(5, 60);
            this.tree.Name = "tree";
            this.tree.Size = new System.Drawing.Size(390, 455);
            this.tree.TabIndex = 12;
            // 
            // PanelTitle
            // 
            this.PanelTitle.BackColor = System.Drawing.Color.Transparent;
            this.PanelTitle.Dock = System.Windows.Forms.DockStyle.Top;
            this.PanelTitle.Location = new System.Drawing.Point(5, 5);
            this.PanelTitle.Name = "PanelTitle";
            this.PanelTitle.Size = new System.Drawing.Size(390, 24);
            this.PanelTitle.TabIndex = 10;
            // 
            // BtShare
            // 
            this.BtShare.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.BtShareLink});
            this.BtShare.Image = ((System.Drawing.Image)(resources.GetObject("BtShare.Image")));
            this.BtShare.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtShare.Name = "BtShare";
            this.BtShare.Size = new System.Drawing.Size(71, 28);
            this.BtShare.Text = "共享";
            // 
            // BtShareLink
            // 
            this.BtShareLink.Name = "BtShareLink";
            this.BtShareLink.Size = new System.Drawing.Size(152, 22);
            this.BtShareLink.Text = "生成共享链接";
            // 
            // FrmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(400, 600);
            this.ControlBox = false;
            this.Controls.Add(this.tree);
            this.Controls.Add(this.toolbar);
            this.Controls.Add(this.PanelTitle);
            this.Controls.Add(this.PanelUser);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "FrmMain";
            this.Padding = new System.Windows.Forms.Padding(5);
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Keyroll";
            this.toolbar.ResumeLayout(false);
            this.toolbar.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Panel PanelUser;
        private System.Windows.Forms.ToolStrip toolbar;
        private System.Windows.Forms.ToolStripDropDownButton BtAdd;
        private System.Windows.Forms.ToolStripMenuItem BtAddDomain;
        private System.Windows.Forms.ToolStripMenuItem BtAddRecord;
        private System.Windows.Forms.ToolStripButton BtRemove;
        private System.Windows.Forms.ToolStripSeparator split1;
        private System.Windows.Forms.ToolStripButton BtSearch;
        private System.Windows.Forms.TreeView tree;
        private System.Windows.Forms.Panel PanelTitle;
        private System.Windows.Forms.ToolStripSplitButton BtShare;
        private System.Windows.Forms.ToolStripMenuItem BtShareLink;

    }
}

